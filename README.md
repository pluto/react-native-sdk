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
