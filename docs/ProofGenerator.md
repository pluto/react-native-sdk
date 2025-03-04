# ProofGenerator Component

The `ProofGenerator` component is a comprehensive solution for generating Pluto proofs in React Native applications. It combines the functionality of the `RequestBuilder` with proof generation capabilities, providing a seamless user experience for the entire proof generation process.

> **Note:** This component is part of the [@plutoxyz/react-native-sdk](./index.md) package.

## Installation

The ProofGenerator component is included in the `@plutoxyz/react-native-sdk` package:

```bash
npm install @plutoxyz/react-native-sdk
# or
yarn add @plutoxyz/react-native-sdk
```

## TypeScript Definition

```typescript
interface ProofGeneratorProps {
  // The manifest object to use for proof generation
  manifest?: ManifestFile;

  // Used in conjunction with manifest param. Not needed if using manifestUrl and prepareJS is hosted as a sibling file to the manifest
  prepareJS?: string;

  // URL to fetch the manifest from.  If using a prepareJS as well, it should be hosted as a sibling file to the manifest with the name prepare.js
  manifestUrl?: string;

  // Callback when proof is successfully generated
  onProofGenerated: (proof: string) => void;

  // Optional error callback
  onError?: (error: Error) => void;

  // Optional callback when manifest is constructed
  onManifestConstructed?: (manifest: ManifestFile) => void;

  // Optional timeout in milliseconds (default: 60000)
  timeout?: number;
}
```

For detailed type definitions of `ManifestFile` and related types, see the [Types Reference](./types.md).

## Usage

### Basic Usage

```tsx
import React from "react";
import { ProofGenerator } from "@plutoxyz/react-native-sdk";

const MyComponent = () => {
  const handleProofGenerated = (proof: string) => {
    console.log("Proof generated:", proof);
  };

  return (
    <ProofGenerator
      manifestUrl="https://example.com/manifest.json"
      // if using prepareJS it would be hosted at https://example.com/prepare.js
      onProofGenerated={handleProofGenerated}
    />
  );
};
```

### Advanced Usage

```tsx
import React, { useState } from "react";
import { View, Button } from "react-native";
import { ProofGenerator, ManifestFile } from "@plutoxyz/react-native-sdk";

const MyAdvancedComponent = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProofGenerated = (proof: string) => {
    console.log("Proof generated:", proof);
    setIsGenerating(false);
  };

  const handleError = (error: Error) => {
    console.error("Error:", error);
    setIsGenerating(false);
  };

  const handleManifestConstructed = (manifest: ManifestFile) => {
    console.log("Manifest constructed:", manifest);
  };

  return (
    <View>
      <Button
        title="Generate Proof"
        onPress={() => setIsGenerating(true)}
        disabled={isGenerating}
      />

      {isGenerating && (
        <ProofGenerator
          manifest={manifest}
          prepareJS="function prepare(ctx, manifest) {
            if(cookies['auth_token']) {
              manifest.request.set['authToken'] = cookies['auth_token'].value;
            }

            return !!manifest.request.getHeader('authorization');
          }"
          onProofGenerated={handleProofGenerated}
          onError={handleError}
          onManifestConstructed={handleManifestConstructed}
          timeout={120000}
        />
      )}
    </View>
  );
};
```

## Props

| Prop                    | Type                                                              | Required | Description                              |
| ----------------------- | ----------------------------------------------------------------- | -------- | ---------------------------------------- |
| `manifest`              | [`ManifestFile`](./types.md#manifestfile)                         | No       | A pre-constructed manifest object        |
| `manifestUrl`           | `string`                                                          | No       | URL to fetch the manifest from           |
| `prepareJS`             | `string`                                                          | No       | JavaScript code for manifest preparation |
| `onProofGenerated`      | `(proof: string) => void`                                         | Yes      | Callback when proof is generated         |
| `onError`               | `(error: Error) => void`                                          | No       | Error callback                           |
| `onManifestConstructed` | `(manifest: `[`ManifestFile`](./types.md#manifestfile)`) => void` | No       | Callback when manifest is constructed    |
| `timeout`               | `number`                                                          | No       | Timeout in milliseconds (default: 60000) |
