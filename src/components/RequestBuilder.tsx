import { NativeModules } from "react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { ManifestFile } from "../types";

const { PlutoProver } = NativeModules;

/**
 * Handles the construction and processing of manifest requests by managing browser view interactions.
 * Can either use a provided manifest directly or fetch one from a URL. Automatically attempts to
 * locate and fetch a prepare.js file if one is not provided but is needed.
 */
interface RequestBuilderProps {
  manifest?: ManifestFile;
  manifestUrl?: string;
  prepareJS?: string;
  onManifestConstructed: (manifest: ManifestFile) => void;
  onError?: (error: Error) => void;
  timeout?: number;
}

export const RequestBuilder = ({
  manifest,
  manifestUrl,
  prepareJS = "",
  onManifestConstructed,
  onError,
  timeout = 60000,
}: RequestBuilderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === "android") {
      console.warn("RequestBuilder is not supported on Android yet.");
      onError &&
        onError(new Error("RequestBuilder is not supported on Android yet."));
      return;
    }

    const loadManifest = async () => {
      try {
        if (manifest) {
          if (!manifest.prepareUrl) {
            setLoading(false);
            onManifestConstructed(manifest);
            return;
          }

          showBrowserView(manifest);
          return;
        }

        if (manifestUrl) {
          try {
            const response = await fetch(manifestUrl);
            const manifestData = await response.json();
            const fetchedManifest = manifestData as ManifestFile;

            if (!fetchedManifest.prepareUrl) {
              setLoading(false);
              onManifestConstructed(fetchedManifest);
              return;
            }

            if (!prepareJS) {
              try {
                // Construct prepare.js URL by replacing manifest filename with prepare.js
                const prepareJsUrl =
                  manifestUrl.substring(0, manifestUrl.lastIndexOf("/") + 1) +
                  "prepare.js";
                const prepareJsResponse = await fetch(prepareJsUrl);
                const fetchedPrepareJS = await prepareJsResponse.text();

                showBrowserView(fetchedManifest, fetchedPrepareJS);
              } catch (prepareJsError) {
                // Silently continue if prepare.js doesn't exist - it's optional
                showBrowserView(fetchedManifest);
              }
            } else {
              showBrowserView(fetchedManifest, prepareJS);
            }
          } catch (fetchError) {
            throw new Error(
              `Failed to fetch manifest: ${
                fetchError instanceof Error
                  ? fetchError.message
                  : String(fetchError)
              }`
            );
          }
        } else {
          throw new Error("Either manifest or manifestUrl must be provided");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setLoading(false);
        if (onError) {
          onError(error instanceof Error ? error : new Error(String(error)));
        }
      }
    };

    loadManifest();
  }, [manifest, manifestUrl, prepareJS, onManifestConstructed, onError]);

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

  const showBrowserView = async (
    manifestToShow: ManifestFile,
    prepareJSToUse: string = ""
  ) => {
    try {
      const updatedManifest = await PlutoProver.showBrowserView(
        manifestToShow,
        prepareJSToUse
      );

      setLoading(false);
      onManifestConstructed(updatedManifest);
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading browser view...</Text>
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
