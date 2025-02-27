import { generateProof, generateProofFromUrl } from "../bridge/NativeBridge";
import { ManifestFile, Methods, Mode } from "../types";
import { NativeModules } from "react-native";

describe("Native Bridge", () => {
  const mockManifest: ManifestFile = {
    manifestVersion: "1.0.0",
    id: "test-id",
    title: "Test Manifest",
    description: "Test description",
    mode: Mode.Proxy,
    request: {
      method: Methods.GET,
      url: "https://example.com",
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test the NativeModule directly
  test("PlutoProver NativeModule is defined", () => {
    expect(NativeModules.PlutoProver).toBeDefined();
  });

  test("NativeModule methods are defined", () => {
    expect(typeof NativeModules.PlutoProver.generateProof).toBe("function");
    expect(typeof NativeModules.PlutoProver.generateProofFromUrl).toBe(
      "function"
    );
    expect(typeof NativeModules.PlutoProver.showBrowserView).toBe("function");
  });

  // Test the NativeModule implementation directly
  test("NativeModule.generateProof returns a result", async () => {
    const result = await NativeModules.PlutoProver.generateProof(mockManifest);
    expect(result).toBeDefined();
  });

  test("NativeModule.generateProofFromUrl returns a result", async () => {
    const result = await NativeModules.PlutoProver.generateProofFromUrl(
      "https://example.com/manifest.json"
    );
    expect(result).toBeDefined();
  });

  // Test the bridge wrapper functions
  test("generateProof wrapper function returns a result", async () => {
    const result = await generateProof(mockManifest);
    expect(result).toBeDefined();
  });

  test("generateProofFromUrl wrapper function returns a result", async () => {
    const url = "https://example.com/manifest.json";
    const result = await generateProofFromUrl(url);
    expect(result).toBeDefined();
  });
});
