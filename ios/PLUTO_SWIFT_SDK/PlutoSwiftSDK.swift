import Foundation

// MARK: - Main SDK Interface
public enum Pluto {
    // MARK: - Public Methods
    public static func generateProof(
        manifest: ManifestFile,
        onStatusChange: ((ProofStatus) -> Void)? = nil
    ) async throws -> String {
        return try await generateProof(
            manifest: manifest,
            onStatusChange: onStatusChange,
            prover: Prover()
        )
    }

    public static func generateProof(
        manifestURL: URL,
        onStatusChange: ((ProofStatus) -> Void)? = nil
    ) async throws -> String {
        let (data, _) = try await URLSession.shared.data(from: manifestURL)
        let manifest = try JSONDecoder().decode(ManifestFile.self, from: data)

        return try await generateProof(
            manifest: manifest,
            onStatusChange: onStatusChange
        )
    }

    // Internal version with Prover parameter for testing
    internal static func generateProof(
        manifest: ManifestFile,
        onStatusChange: ((ProofStatus) -> Void)?,
        prover: Prover
    ) async throws -> String {
        return try await prover.generateProof(
            manifest: manifest,
            onStatusChange: onStatusChange
        )
    }

    public static func parseManifest(from jsonString: String) -> ManifestFile? {
        return ManifestParser.parseManifest(from: jsonString)
    }
}

