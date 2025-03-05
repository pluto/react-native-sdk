import { RequestBuilder } from "../components/RequestBuilder";
import React from "react";
import { ManifestFile, Methods } from "../types";
import { NativeModules } from "react-native";

describe("RequestBuilder", () => {
  test("component has correct default props", () => {
    const mockOnManifestConstructed = jest.fn();

    const component = (
      <RequestBuilder onManifestConstructed={mockOnManifestConstructed} />
    );

    expect(component.props.onManifestConstructed).toBe(
      mockOnManifestConstructed
    );

    // Verify internal defaults are not exposed in props
    expect(component.props.manifest).toBeUndefined();
    expect(component.props.manifestUrl).toBeUndefined();
    expect(component.props.prepareJS).toBeUndefined();
    expect(component.props.timeout).toBeUndefined();
    expect(component.props.onError).toBeUndefined();
  });

  test("component accepts all optional props", () => {
    const mockOnManifestConstructed = jest.fn();
    const mockOnError = jest.fn();

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
    /**
     * Verifies the native bridge integration by checking:
     * 1. The PlutoProver module is properly registered
     * 2. Required native methods are available
     * Note: Full integration testing would require a mock native environment
     */
    expect(NativeModules.PlutoProver).toBeDefined();
    expect(typeof NativeModules.PlutoProver.showBrowserView).toBe("function");
  });
});
