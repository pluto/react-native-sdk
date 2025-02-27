/**
 * Pluto React Native SDK Test App
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  generateProof,
  generateProofFromUrl,
  RequestBuilder,
  ProofGenerator,
} from "../src";
import { ManifestFile } from "../src/types";

// Default manifest URL for testing
const DEFAULT_MANIFEST_URL =
  "https://raw.githubusercontent.com/pluto/attest-integrations/refs/heads/main/integrations/reddit-user-karma/manifest.json";

function App(): React.JSX.Element {
  const [manifestUrl, setManifestUrl] = useState<string>(DEFAULT_MANIFEST_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [manifest, setManifest] = useState<ManifestFile | null>(null);
  const [showRequestBuilder, setShowRequestBuilder] = useState<boolean>(false);
  const [showProofGenerator, setShowProofGenerator] = useState<boolean>(false);

  // Function to generate proof directly from URL
  const handleGenerateProofFromUrl = async () => {
    // Using hardcoded URL instead of user input
    const hardcodedUrl =
      "https://util-api.pluto.dev/manifests/2b073f5d-a3af-4847-a7ac-ecbf1d259ee1/manifest.json";

    setLoading(true);
    setResult("");

    try {
      const proofResult = await generateProofFromUrl(hardcodedUrl);
      setResult(JSON.stringify(proofResult, null, 2));
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to load manifest using RequestBuilder component
  const handleLoadManifest = () => {
    if (!manifestUrl) {
      Alert.alert("Error", "Please enter a manifest URL");
      return;
    }

    setResult("");
    setManifest(null);
    setShowRequestBuilder(true);
  };

  // Function to handle manifest construction completion
  const handleManifestConstructed = (constructedManifest: ManifestFile) => {
    setManifest(constructedManifest);
    setShowRequestBuilder(false);
    setResult("Manifest loaded successfully. Ready to generate proof.");
  };

  // Function to handle RequestBuilder errors
  const handleRequestBuilderError = (error: Error) => {
    setShowRequestBuilder(false);
    setResult(`Error: ${error.message}`);
  };

  // Function to generate proof from loaded manifest
  const handleGenerateProofFromManifest = async () => {
    if (!manifest) {
      Alert.alert("Error", "Please load a manifest first");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const proofResult = await generateProof(manifest);
      setResult(JSON.stringify(proofResult, null, 2));
    } catch (error) {
      console.error("Error generating proof:", error);
      setResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to use ProofGenerator (combined RequestBuilder + proof generation)
  const handleUseProofGenerator = () => {
    if (!manifestUrl) {
      Alert.alert("Error", "Please enter a manifest URL");
      return;
    }

    setResult("");
    setManifest(null);
    setShowProofGenerator(true);
  };

  // Function to handle proof generation completion
  const handleProofGenerated = (proof: string) => {
    setShowProofGenerator(false);
    setResult(JSON.stringify(proof, null, 2));
  };

  // Function to handle ProofGenerator errors
  const handleProofGeneratorError = (error: Error) => {
    setShowProofGenerator(false);
    setResult(`Error: ${error.message}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Pluto SDK Tester</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manifest URL</Text>
          <TextInput
            style={styles.input}
            value={manifestUrl}
            onChangeText={setManifestUrl}
            placeholder="Enter manifest URL"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGenerateProofFromUrl}
            disabled={loading || showRequestBuilder || showProofGenerator}
          >
            <Text style={styles.buttonText}>
              Generate Proof from Hardcoded URL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLoadManifest}
            disabled={loading || showRequestBuilder || showProofGenerator}
          >
            <Text style={styles.buttonText}>Load Manifest with Browser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !manifest && styles.disabledButton]}
            onPress={handleGenerateProofFromManifest}
            disabled={
              loading || !manifest || showRequestBuilder || showProofGenerator
            }
          >
            <Text style={styles.buttonText}>Generate Proof from Manifest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.highlightButton]}
            onPress={handleUseProofGenerator}
            disabled={loading || showRequestBuilder || showProofGenerator}
          >
            <Text style={styles.buttonText}>
              All-in-One: Generate Proof with Browser
            </Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        )}

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Result:</Text>
            <ScrollView style={styles.resultScroll}>
              <Text style={styles.resultText}>{result}</Text>
            </ScrollView>
          </View>
        ) : null}

        {/* RequestBuilder Component */}
        {showRequestBuilder && (
          <View style={styles.overlayContainer}>
            <RequestBuilder
              manifestUrl={manifestUrl}
              onManifestConstructed={handleManifestConstructed}
              onError={handleRequestBuilderError}
            />
          </View>
        )}

        {/* ProofGenerator Component */}
        {showProofGenerator && (
          <View style={styles.overlayContainer}>
            <ProofGenerator
              manifestUrl={manifestUrl}
              onProofGenerated={handleProofGenerated}
              onError={(error) => {
                handleProofGeneratorError(error);
                // Display a more user-friendly error message
                Alert.alert(
                  "Error",
                  `Failed to generate proof: ${error.message}`,
                  [{ text: "OK" }]
                );
              }}
              onManifestConstructed={(constructedManifest: ManifestFile) => {
                setManifest(constructedManifest);
              }}
              timeout={120000} // 2 minutes timeout
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1, // Ensure content expands to fill available space
    minHeight: "100%",
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 16,
    gap: 12,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  highlightButton: {
    backgroundColor: "#4CAF50",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#333",
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1, // Allow the result container to expand
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  resultScroll: {
    maxHeight: 300,
  },
  resultText: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
