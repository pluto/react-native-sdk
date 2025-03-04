# RequestBuilder Component

The `RequestBuilder` component is a foundational component in the Pluto React Native SDK that handles the construction and processing of manifest requests. It provides a bridge between your React Native application and the native Pluto SDK for manifest handling.

> **Note:** This component is part of the [@plutoxyz/react-native-sdk](./index.md) package.

## Installation

The RequestBuilder component is included in the `@plutoxyz/react-native-sdk` package:

```bash
npm install @plutoxyz/react-native-sdk
# or
yarn add @plutoxyz/react-native-sdk
```

## TypeScript Definition

```typescript
interface RequestBuilderProps {
  // The manifest object to use for proof generation
  manifest?: ManifestFile;

  // Used in conjunction with manifest param. Not needed if using manifestUrl and prepareJS is hosted as a sibling file to the manifest
  prepareJS?: string;

  // URL to fetch the manifest from.  If using a prepareJS as well, it should be hosted as a sibling file to the manifest with the name prepare.js
  manifestUrl?: string;

  // Callback when manifest is successfully constructed
  onManifestConstructed: (manifest: ManifestFile) => void;

  // Optional error callback
  onError?: (error: Error) => void;

  // Optional timeout in milliseconds (default: 60000)
  timeout?: number;
}
```

For detailed type definitions of `ManifestFile` and related types, see the [Types Reference](./types.md).

## Usage

### Basic Usage

```tsx
import React from "react";
import { RequestBuilder } from "@plutoxyz/react-native-sdk";

const MyComponent = () => {
  const handleManifestConstructed = (manifest: ManifestFile) => {
    console.log("Manifest constructed:", manifest);
  };

  return (
    <RequestBuilder
      manifestUrl="https://example.com/manifest.json"
      // if using prepareJS it would be hosted at https://example.com/prepare.js
      onManifestConstructed={handleManifestConstructed}
    />
  );
};
```

### Advanced Usage

```tsx
import React, { useState } from "react";
import { View, Button } from "react-native";
import { RequestBuilder, ManifestFile } from "@plutoxyz/react-native-sdk";

const MyAdvancedComponent = () => {
  const [isConstructing, setIsConstructing] = useState(false);

  const manifest: ManifestFile = {
    // Your manifest object structure
  };

  const handleManifestConstructed = (manifest: ManifestFile) => {
    console.log("Manifest constructed:", manifest);
    setIsConstructing(false);
  };

  const handleError = (error: Error) => {
    console.error("Error:", error);
    setIsConstructing(false);
  };

  return (
    <View>
      <Button
        title="Construct Manifest"
        onPress={() => setIsConstructing(true)}
        disabled={isConstructing}
      />

      {isConstructing && (
        <RequestBuilder
          manifest={manifest}
          prepareJS="function prepare(ctx, manifest) {
            if(cookies['auth_token']) {
              manifest.request.set['authToken'] = cookies['auth_token'].value;
            }

            return !!manifest.request.getHeader('authorization');
          }"
          onManifestConstructed={handleManifestConstructed}
          onError={handleError}
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
| `manifest`              | [`ManifestFile`](./types.md#manifestfile)                         | No       | A manifest object to process             |
| `manifestUrl`           | `string`                                                          | No       | URL to fetch the manifest from           |
| `prepareJS`             | `string`                                                          | No       | JavaScript code for manifest preparation |
| `onManifestConstructed` | `(manifest: `[`ManifestFile`](./types.md#manifestfile)`) => void` | Yes      | Callback when manifest is constructed    |
| `onError`               | `(error: Error) => void`                                          | No       | Error callback                           |
| `timeout`               | `number`                                                          | No       | Timeout in milliseconds (default: 60000) |
