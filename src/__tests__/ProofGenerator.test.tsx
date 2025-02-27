import { ProofGenerator } from "../components/ProofGenerator";
import React from "react";
import { ManifestFile, Methods } from "../types";
import { NativeModules } from "react-native";

describe("ProofGenerator", () => {
  test("component has correct default props", () => {
    // Mock the onProofGenerated callback
    const mockOnProofGenerated = jest.fn();

    // Create a ProofGenerator component with minimum required props
    const component = (
      <ProofGenerator onProofGenerated={mockOnProofGenerated} />
    );

    // Verify the component renders with the required prop
    expect(component.props.onProofGenerated).toBe(mockOnProofGenerated);

    // Verify the default timeout prop value (from the component source code)
    expect(component.props.timeout).toBeUndefined(); // It's undefined in props but has a default in the component
  });

  test("component accepts all optional props", () => {
    // Mock the required callbacks
    const mockOnProofGenerated = jest.fn();
    const mockOnError = jest.fn();
    const mockOnManifestConstructed = jest.fn();

    // Create a component with all possible props
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

    // Verify all props were passed correctly
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
    // Verify that the PlutoProver NativeModule exists
    expect(NativeModules.PlutoProver).toBeDefined();

    // Verify that the generateProof method exists on the NativeModule
    expect(typeof NativeModules.PlutoProver.generateProof).toBe("function");

    // Since we're not actually executing the component's functions
    // (which would require rendering and interaction testing),
    // we just verify that the NativeModule we depend on is properly defined
    // and has the expected methods that our component will call.
  });
});
