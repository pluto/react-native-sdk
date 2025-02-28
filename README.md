# @plutoxyz/react-native-sdk

A React Native wrapper for the PlutoSwiftSDK that enables Pluto proof generation and attestation capabilities in React Native applications.

> **Note:** This module currently supports iOS only. Android support is planned for future releases.

## Installation

```bash
# Using npm
npm install @plutoxyz/react-native-sdk

# Using yarn
yarn add @plutoxyz/react-native-sdk
```

### iOS Setup

After installing the package, run pod install in your iOS directory:

```bash
cd ios && pod install
```

That's it! The SDK uses auto-linking to automatically set up the necessary native dependencies.

## Features

- **RequestBuilder**: A component for building and customizing requests with browser-based user interaction
- **ProofGenerator**: A component that combines RequestBuilder with proof generation
- **Direct API functions**: For programmatic proof generation

## Platform Support

| Platform | Support Status                                     |
| -------- | -------------------------------------------------- |
| iOS      | ✅ Fully Supported                                 |
| Android  | ❌ Not yet supported (planned for future releases) |

When used in an Android application, all methods and components will gracefully throw errors with clear messages indicating the lack of Android support. This ensures your cross-platform app doesn't crash, but you'll need to implement platform-specific logic to handle these cases.

```typescript
// Example of platform-specific usage
import { Platform } from "react-native";
import { ProofGenerator } from "@plutoxyz/react-native-sdk";

// Only use the component on iOS
{
  Platform.OS === "ios" && (
    <ProofGenerator
      manifestUrl="https://example.com/manifest.json"
      onProofGenerated={(proof) => {
        console.log("Proof generated:", proof);
      }}
      onError={(error) => {
        console.error("Error:", error);
      }}
    />
  );
}
```

## Usage

### Basic Proof Generation

```typescript
import { generateProofFromUrl } from "@plutoxyz/react-native-sdk";

// Generate a proof from a manifest URL
const generateProof = async () => {
  try {
    const manifestUrl = "https://example.com/manifest.json";
    const proof = await generateProofFromUrl(manifestUrl);
    console.log("Proof generated:", proof);
  } catch (error) {
    console.error("Error generating proof:", error);
  }
};
```

### Using the RequestBuilder Component

```typescript
import { RequestBuilder } from "@plutoxyz/react-native-sdk";

// In your component:
<RequestBuilder
  manifestUrl="https://example.com/manifest.json"
  onManifestConstructed={(manifest) => {
    console.log("Manifest constructed:", manifest);
    // Use the manifest for further operations
  }}
  onError={(error) => {
    console.error("Error:", error);
  }}
/>;
```

### Using the ProofGenerator Component

```typescript
import { ProofGenerator } from "@plutoxyz/react-native-sdk";

// In your component:
<ProofGenerator
  manifestUrl="https://example.com/manifest.json"
  onProofGenerated={(proof) => {
    console.log("Proof generated:", proof);
    // Use the proof
  }}
  onError={(error) => {
    console.error("Error:", error);
  }}
  timeout={60000} // Optional timeout in milliseconds
/>;
```

## API Reference

### Components

#### RequestBuilder

| Prop                  | Type                             | Required | Description                              |
| --------------------- | -------------------------------- | -------- | ---------------------------------------- |
| manifest              | ManifestFile                     | No       | A manifest object                        |
| manifestUrl           | string                           | No       | URL to fetch manifest from               |
| prepareJS             | string                           | No       | JavaScript code for preparation          |
| onManifestConstructed | (manifest: ManifestFile) => void | Yes      | Callback when manifest is constructed    |
| onError               | (error: Error) => void           | No       | Error callback                           |
| timeout               | number                           | No       | Timeout in milliseconds (default: 60000) |

#### ProofGenerator

| Prop                  | Type                             | Required | Description                              |
| --------------------- | -------------------------------- | -------- | ---------------------------------------- |
| manifest              | ManifestFile                     | No       | A manifest object                        |
| manifestUrl           | string                           | No       | URL to fetch manifest from               |
| prepareJS             | string                           | No       | JavaScript code for preparation          |
| onProofGenerated      | (proof: string) => void          | Yes      | Callback when proof is generated         |
| onError               | (error: Error) => void           | No       | Error callback                           |
| onManifestConstructed | (manifest: ManifestFile) => void | No       | Callback when manifest is constructed    |
| timeout               | number                           | No       | Timeout in milliseconds (default: 60000) |

### Functions

| Function             | Parameters               | Returns         | Description                              |
| -------------------- | ------------------------ | --------------- | ---------------------------------------- |
| generateProof        | (manifest: ManifestFile) | Promise<string> | Generates a proof from a manifest object |
| generateProofFromUrl | (url: string)            | Promise<string> | Generates a proof from a manifest URL    |

## For Developers

### Directory Structure

- **src/**: Source code for the library

  - **components/**: React components
    - `RequestBuilder.tsx`: Wrapper for the Swift RequestBuilder
    - `ProofGenerator.tsx`: Component that combines RequestBuilder with proof generation
  - **bridge/**: Native bridging code
    - `NativeBridge.tsx`: Bridge functions to the Swift SDK
  - **types/**: TypeScript type definitions
  - **index.ts**: Main entry point that exports everything

- **example/**: Example/test app

  - `App.tsx`: Test application for the library

- **ios/**: iOS native code
  - `PLUTO_SWIFT_SDK/`: Reference files from the PlutoSwiftSDK pod

### Contributing

Contributions are welcome! Here's how you can contribute to this project:

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/react-native-pluto-sdk.git
   cd react-native-pluto-sdk
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
5. **Make your changes and commit them**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

Please make sure your code follows the existing style and include appropriate tests.

### Building and Testing

To build the library:

```bash
npm run build
```

To run tests:

```bash
npm test
```

To try the example app:

```bash
# Navigate to the example directory
cd example
# Install dependencies
npm install
# Run the app on iOS
npm run ios
```

### Releasing

This library uses [release-it](https://github.com/release-it/release-it) to manage releases with automatic versioning and changelog generation.

To release a new version:

1. **Make sure all changes are committed and pushed**
2. **Update the CHANGELOG.md file**:
   - Add a new section for the upcoming version at the top of the file
   - Document all notable changes under appropriate categories (Added, Changed, Fixed, etc.)
   - Follow the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
3. **Commit the changelog update**:
   ```bash
   git add CHANGELOG.md
   git commit -m 'Update changelog for version X.Y.Z'
   ```
4. **Run the release command**:
   ```bash
   npm run release
   ```
5. **Follow the prompts to choose the version type** (major, minor, patch, or prerelease)
6. **The tool will automatically**:
   - Bump the version in package.json
   - Create a git tag
   - Push to GitHub
   - Publish to npm

For a prerelease version (alpha/beta):

```bash
# For alpha releases
npm run release -- --preRelease=alpha

# For beta releases
npm run release -- --preRelease=beta
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ProofGenerator Component

The `ProofGenerator` component can be used to generate proofs based on a manifest file or URL.

```tsx
import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { ProofGenerator } from "@plutoxyz/react-native-sdk";

const MyProofComponent = () => {
  const [proof, setProof] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartProofGeneration = () => {
    setIsGenerating(true);
  };

  const handleProofGenerated = (generatedProof) => {
    setProof(generatedProof);
    setIsGenerating(false);
  };

  const handleError = (error) => {
    console.error("Proof generation error:", error);
    setIsGenerating(false);
  };

  return (
    <View>
      <Button
        title="Generate Proof"
        onPress={handleStartProofGeneration}
        disabled={isGenerating}
      />

      {isGenerating && (
        <ProofGenerator
          manifestUrl="https://example.com/your-manifest-url"
          onProofGenerated={handleProofGenerated}
          onError={handleError}
          timeout={60000} // Optional: 60 second timeout
        />
      )}

      {proof && <Text>Proof Generated: {proof.substring(0, 50)}...</Text>}
    </View>
  );
};
```

### Important Notes

1. Always import React with `import * as React from 'react'` or `import React from 'react'` in your component files to avoid "Cannot read property 'useState' of null" errors.

2. The ProofGenerator component is not supported on Android yet.

3. Make sure you provide at least one of:

   - `manifest`: A manifest object
   - `manifestUrl`: URL to fetch a manifest from

4. Always provide the required callbacks:

   - `onProofGenerated`: Called when a proof is successfully generated
   - `onError` (optional but recommended): Called when an error occurs

5. Make sure your React Native project includes the necessary permissions for network requests.

## Troubleshooting

### "Cannot read property 'useState' of null"

This error usually occurs when React is not properly imported or available in your component. Make sure to import React correctly:

```tsx
import * as React from "react";
// or
import React from "react";
```

### TypeScript Errors with ProofGenerator

If you encounter TypeScript errors like:

```
'ProofGenerator' cannot be used as a JSX component.
Its type 'FC<ProofGeneratorProps>' is not a valid JSX element type.
```

Make sure you are using a compatible version of React and React Native with this library. The library requires:

- React 16.8+ (for Hooks support)
- React Native 0.60+

### Component Not Found

If you encounter errors importing the component, make sure the library is properly installed and linked in your project.

## API Reference

### ProofGenerator Props

| Prop                  | Type                             | Required | Description                                     |
| --------------------- | -------------------------------- | -------- | ----------------------------------------------- |
| manifest              | ManifestFile                     | No       | The manifest object to use for proof generation |
| manifestUrl           | string                           | No       | URL to fetch a manifest from                    |
| prepareJS             | string                           | No       | JavaScript to prepare the manifest data         |
| onProofGenerated      | (proof: string) => void          | Yes      | Callback when a proof is successfully generated |
| onError               | (error: Error) => void           | No       | Callback when an error occurs                   |
| onManifestConstructed | (manifest: ManifestFile) => void | No       | Callback when a manifest is constructed         |
| timeout               | number                           | No       | Timeout in milliseconds (default: 60000)        |
