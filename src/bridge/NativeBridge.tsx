import { NativeModules, Platform } from "react-native";
import { ManifestFile } from "../types";
import { RequestBuilder } from "../components/RequestBuilder";
import { ProofGenerator } from "../components/ProofGenerator";

const { PlutoProver } = NativeModules;

export const generateProof = async (manifest: ManifestFile) => {
  if (Platform.OS === "android") {
    throw new Error("The PlutoProver module is not supported on Android yet.");
  }
  return await PlutoProver.generateProof(manifest);
};

export const generateProofFromUrl = async (url: string) => {
  if (Platform.OS === "android") {
    throw new Error("The PlutoProver module is not supported on Android yet.");
  }
  return PlutoProver.generateProofFromUrl(url);
};

// Export RequestBuilder component
export { RequestBuilder, ProofGenerator };
