import Foundation
import UIKit
import PlutoSwiftSDK
import React

@objc(PlutoProver)
class PlutoProver: NSObject, RCTBridgeModule {
    // MARK: - RCTBridgeModule Requirements

    static func moduleName() -> String! {
        return "PlutoProver"
    }

    static func requiresMainQueueSetup() -> Bool {
        return false
    }

    // MARK: - Public Methods

    @objc
    func generateProof(_ manifest: [String: Any],
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
        Task {
            do {
                print("Generating proof")
                let jsonData = try JSONSerialization.data(withJSONObject: manifest)
                let manifestFile = try JSONDecoder().decode(ManifestFile.self, from: jsonData)

                let proofResult = try await Pluto.generateProof(manifest: manifestFile) { status in
                    print("Proof status changed: \(status)")
                }

                print("Proof Generated")
                await MainActor.run {
                    resolve(String(describing: proofResult))
                }
            } catch {
                print("Error generating proof: \(error.localizedDescription)")
                await MainActor.run {
                    reject("ERROR", error.localizedDescription, error)
                }
            }
        }
    }

    @objc
    func generateProofFromUrl(_ url: String,
                             resolve: @escaping RCTPromiseResolveBlock,
                             reject: @escaping RCTPromiseRejectBlock) {
        Task {
            do {
                guard let manifestURL = URL(string: url) else {
                    await MainActor.run {
                        reject("ERROR", "Invalid URL", nil)
                    }
                    return
                }

                print("Attempting to generate proof from URL: \(manifestURL)")

                do {
                    // First get the raw data
                    let (data, _) = try await URLSession.shared.data(from: manifestURL)

                    // Print the raw JSON string
                    if let jsonString = String(data: data, encoding: .utf8) {
                        print("Raw JSON response: \(jsonString)")
                    }

                    // Try to decode and proceed with proof generation
                    let proofResult = try await Pluto.generateProof(manifestURL: manifestURL) { status in
                        print("Proof status changed: \(status)")
                    }

                    await MainActor.run {
                        resolve(String(describing: proofResult))
                    }
                } catch let plutoError {
                    let errorDetails = """
                    Pluto SDK Error: \(plutoError)
                    Error type: \(type(of: plutoError))
                    Full error details: \(String(describing: plutoError))
                    """
                    print(errorDetails)

                    await MainActor.run {
                        reject("PLUTO_ERROR", errorDetails, plutoError)
                    }
                }
            } catch let error {
                let errorMessage = "General error: \(error)"
                print(errorMessage)

                await MainActor.run {
                    reject("ERROR", errorMessage, error)
                }
            }
        }
    }

    @objc
    func showBrowserView(_ manifest: [String: Any],
                        prepareJS: String,
                        resolve: @escaping RCTPromiseResolveBlock,
                        reject: @escaping RCTPromiseRejectBlock) {
        print("PlutoProver.showBrowserView called with manifest and prepareJS")
        Task {
            do {
                // Convert manifest dictionary to ManifestFile
                print("Attempting to decode manifest")
                let jsonData = try JSONSerialization.data(withJSONObject: manifest)
                let manifestFile = try JSONDecoder().decode(ManifestFile.self, from: jsonData)
                print("Manifest decoded successfully")

                // Get the root view controller - updated for iOS 13+
                print("Retrieving root view controller")
                guard let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                      let rootViewController = scene.windows.first?.rootViewController else {
                    print("Failed to get root view controller")
                    await MainActor.run {
                        reject("ERROR", "Could not find root view controller", nil)
                    }
                    return
                }
                print("Root view controller retrieved successfully")

                await MainActor.run {
                    print("Creating RequestBuilder on main thread")
                    // Create a RequestBuilder instance
                    let requestBuilder = RequestBuilder(parentViewController: rootViewController)

                    // Set the manifest and prepare.js
                    print("Setting manifest on RequestBuilder")
                    _ = requestBuilder.withManifest(manifestFile)

                    if !prepareJS.isEmpty {
                        print("Setting prepareJS on RequestBuilder")
                        _ = requestBuilder.withPrepareJS(prepareJS)
                    }

                    // Show the browser view
                    do {
                        print("Showing browser view")
                        try requestBuilder.showBrowserView { updatedManifest in
                            print("Browser view callback received with updated manifest")
                            // Convert the updated manifest to a dictionary
                            do {
                                print("Encoding updated manifest to JSON")
                                let jsonData = try JSONEncoder().encode(updatedManifest)
                                if let jsonDict = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any] {
                                    print("Updated manifest encoded successfully, resolving promise")
                                    resolve(jsonDict)
                                } else {
                                    print("Failed to convert manifest to dictionary")
                                    reject("ERROR", "Failed to convert manifest to dictionary", nil)
                                }
                            } catch {
                                print("Error encoding manifest: \(error)")
                                reject("ERROR", "Failed to encode manifest: \(error.localizedDescription)", error)
                            }
                        }
                    } catch {
                        print("Error showing browser view: \(error)")
                        reject("ERROR", "Failed to show browser view: \(error.localizedDescription)", error)
                    }
                }
            } catch {
                print("Error decoding manifest: \(error)")
                await MainActor.run {
                    reject("ERROR", "Failed to decode manifest: \(error.localizedDescription)", error)
                }
            }
        }
    }
}



