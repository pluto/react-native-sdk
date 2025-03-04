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
  timeout?: number; // Add timeout prop
}

/**
 * ProofGenerator component
 * Combines RequestBuilder with proof generation
 */
export const ProofGenerator = ({
  manifest,
  manifestUrl,
  prepareJS,
  onProofGenerated,
  onError,
  onManifestConstructed,
  timeout = 60000, // Default 60 second timeout
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

  // Add timeout mechanism
  useEffect(() => {
    // Set a timeout to prevent hanging indefinitely
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

  // Handle when the manifest is constructed by RequestBuilder
  const handleManifestConstructed = (newManifest: ManifestFile) => {
    setConstructedManifest(newManifest);
    setStage("generating");

    // Optional callback to inform parent component about the constructed manifest
    if (onManifestConstructed) {
      onManifestConstructed(newManifest);
    }

    // Start generating the proof
    generateProofInternal(newManifest);
  };

  // Handle errors from RequestBuilder
  const handleRequestBuilderError = (error: Error) => {
    setError(error.message);
    setLoading(false);

    if (onError) {
      onError(error);
    }
  };

  // Generate proof with the constructed manifest
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

  // Render error state first
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // If we're in the manifest construction stage, render the RequestBuilder
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

  // If we're in the generating stage and still loading, show the generating indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Generating proof...</Text>
      </View>
    );
  }

  // Once the proof is generated and callback is called, component doesn't need to render anything
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
