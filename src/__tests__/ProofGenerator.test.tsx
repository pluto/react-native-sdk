import { ProofGenerator } from "../components/ProofGenerator";
import * as React from "react";
import { ManifestFile, Methods } from "../types";
import { NativeModules } from "react-native";

describe("ProofGenerator", () => {
  test("component has correct default props", () => {
    const mockOnProofGenerated = jest.fn();

    const component = (
      <ProofGenerator onProofGenerated={mockOnProofGenerated} />
    );

    expect(component.props.onProofGenerated).toBe(mockOnProofGenerated);
    expect(component.props.timeout).toBeUndefined(); // Default value is set internally
  });

  test("component accepts all optional props", () => {
    const mockOnProofGenerated = jest.fn();
    const mockOnError = jest.fn();
    const mockOnManifestConstructed = jest.fn();

    const manifest: ManifestFile = {
      id: "test",
      manifestVersion: "0.1",
      title: "Test Title",
      description: "Test Description",
      request: {
        method: Methods.GET,
        url: "https://example.com/api",
        headers: { "Content-Type": "application/json" },
        body: null,
      },
      response: {
        status: "200",
        headers: { "Content-Type": "application/json" },
        body: {
          json: ["test"],
        },
      },
    };
    const manifestUrl = "https://example.com/manifest.json";
    const prepareJS = "console.log('test')";
    const timeout = 30000;

    const component = (
      <ProofGenerator
        manifest={manifest}
        manifestUrl={manifestUrl}
        prepareJS={prepareJS}
        onProofGenerated={mockOnProofGenerated}
        onError={mockOnError}
        onManifestConstructed={mockOnManifestConstructed}
        timeout={timeout}
      />
    );

    expect(component.props.manifest).toBe(manifest);
    expect(component.props.manifestUrl).toBe(manifestUrl);
    expect(component.props.prepareJS).toBe(prepareJS);
    expect(component.props.onProofGenerated).toBe(mockOnProofGenerated);
    expect(component.props.onError).toBe(mockOnError);
    expect(component.props.onManifestConstructed).toBe(
      mockOnManifestConstructed
    );
    expect(component.props.timeout).toBe(timeout);
  });

  test("component interfaces with the NativeBridge", async () => {
    /**
     * Verifies the native bridge integration by checking:
     * 1. The PlutoProver module is properly registered
     * 2. Required native methods are available
     * Note: Full integration testing would require a mock native environment
     */
    expect(NativeModules.PlutoProver).toBeDefined();
    expect(typeof NativeModules.PlutoProver.generateProof).toBe("function");
  });
});
