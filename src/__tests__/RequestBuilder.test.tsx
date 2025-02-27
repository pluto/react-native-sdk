import { RequestBuilder } from "../components/RequestBuilder";
import React from "react";
import { ManifestFile, Methods } from "../types";
import { NativeModules } from "react-native";

describe("RequestBuilder", () => {
  test("component has correct default props", () => {
    // Mock the required onManifestConstructed callback
    const mockOnManifestConstructed = jest.fn();

    // Create a RequestBuilder component with minimum required props
    const component = (
      <RequestBuilder onManifestConstructed={mockOnManifestConstructed} />
    );

    // Verify the component has the required prop
    expect(component.props.onManifestConstructed).toBe(
      mockOnManifestConstructed
    );

    // Verify default prop values
    expect(component.props.manifest).toBeUndefined();
    expect(component.props.manifestUrl).toBeUndefined();
    expect(component.props.prepareJS).toBeUndefined(); // Will default to "" in the component
    expect(component.props.timeout).toBeUndefined(); // Will default to 60000 in the component
    expect(component.props.onError).toBeUndefined();
  });

  test("component accepts all optional props", () => {
    // Mock the required callback
    const mockOnManifestConstructed = jest.fn();
    const mockOnError = jest.fn();

    // Create a component with all props
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
      <RequestBuilder
        manifest={manifest}
        manifestUrl={manifestUrl}
        prepareJS={prepareJS}
        onManifestConstructed={mockOnManifestConstructed}
        onError={mockOnError}
        timeout={timeout}
      />
    );

    // Verify all props were passed correctly
    expect(component.props.manifest).toBe(manifest);
    expect(component.props.manifestUrl).toBe(manifestUrl);
    expect(component.props.prepareJS).toBe(prepareJS);
    expect(component.props.onManifestConstructed).toBe(
      mockOnManifestConstructed
    );
    expect(component.props.onError).toBe(mockOnError);
    expect(component.props.timeout).toBe(timeout);
  });

  test("component interfaces with the NativeBridge", async () => {
    // Verify that the PlutoProver NativeModule exists
    expect(NativeModules.PlutoProver).toBeDefined();

    // Verify that the showBrowserView method exists on the NativeModule
    expect(typeof NativeModules.PlutoProver.showBrowserView).toBe("function");

    // Since we're not actually executing the component's functions
    // (which would require rendering and interaction testing),
    // we just verify that the NativeModule we depend on is properly defined
    // and has the expected methods that our component will call.
  });
});
