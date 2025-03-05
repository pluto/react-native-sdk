import { NativeModules } from "react-native";
import { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { ManifestFile } from "../types";
import { RequestBuilder } from "./RequestBuilder";

const { PlutoProver } = NativeModules;
interface ProofGeneratorProps {
  manifest?: ManifestFile;
  manifestUrl?: string;
  prepareJS?: string;
  onProofGenerated: (proof: string) => void;
  onError?: (error: Error) => void;
  onManifestConstructed?: (manifest: ManifestFile) => void;
  timeout?: number;
}

/**
 * Combines RequestBuilder with proof generation capabilities to provide
 * a complete end-to-end proof generation flow. Handles manifest construction,
 * user interaction, and proof generation in a single component.
 */
export const ProofGenerator = ({
  manifest,
  manifestUrl,
  prepareJS,
  onProofGenerated,
  onError,
  onManifestConstructed,
  timeout = 60000,
}: ProofGeneratorProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<"constructing" | "generating">(
    "constructing"
  );
  const [constructedManifest, setConstructedManifest] =
    useState<ManifestFile | null>(null);

  useEffect(() => {
    if (Platform?.OS === "android") {
      console.warn("ProofGenerator is not supported on Android yet.");
      onError &&
        onError(new Error("ProofGenerator is not supported on Android yet."));
      return;
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Operation timed out. Please try again.");
        if (onError) {
          onError(new Error("Operation timed out. Please try again."));
        }
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading, onError, timeout]);

  const handleManifestConstructed = (newManifest: ManifestFile) => {
    setConstructedManifest(newManifest);
    setStage("generating");

    if (onManifestConstructed) {
      onManifestConstructed(newManifest);
    }

    generateProofInternal(newManifest);
  };

  const handleRequestBuilderError = (error: Error) => {
    setError(error.message);
    setLoading(false);

    if (onError) {
      onError(error);
    }
  };

  const generateProofInternal = async (manifest: ManifestFile) => {
    try {
      const proofResult = await PlutoProver.generateProof(manifest);
      setLoading(false);
      onProofGenerated(proofResult);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setLoading(false);

      if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)));
      }
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (stage === "constructing") {
    return (
      <RequestBuilder
        manifest={manifest}
        manifestUrl={manifestUrl}
        prepareJS={prepareJS}
        onManifestConstructed={handleManifestConstructed}
        onError={handleRequestBuilderError}
        timeout={timeout}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Generating proof...</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
