import * as React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { ProofGenerator } from "pluto-react-native-lib";

export const PlutoProofGeneratorExample: React.FC = () => {
  const [proof, setProof] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleStartProofGeneration = () => {
    setIsGenerating(true);
    setError(null);
    setProof(null);
  };

  const handleProofGenerated = (generatedProof: string) => {
    setProof(generatedProof);
    setIsGenerating(false);
  };

  const handleError = (err: Error) => {
    setError(err.message);
    setIsGenerating(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pluto Proof Generator Example</Text>

      {!isGenerating && (
        <Button title="Generate Proof" onPress={handleStartProofGeneration} />
      )}

      {isGenerating && (
        <View style={styles.proofContainer}>
          <ProofGenerator
            manifestUrl="https://example.com/your-manifest-url"
            onProofGenerated={handleProofGenerated}
            onError={handleError}
            timeout={120000} // 2 minutes timeout
          />
        </View>
      )}

      {proof && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Generated Proof:</Text>
          <Text
            style={styles.resultText}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {proof}
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error:</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  proofContainer: {
    flex: 1,
    minHeight: 200,
    marginVertical: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  resultContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
  },
  errorContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff1f0",
    borderRadius: 8,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#f5222d",
  },
  errorText: {
    fontSize: 14,
    color: "#f5222d",
  },
});
