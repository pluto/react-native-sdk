# Pluto React Native SDK Documentation

The Pluto React Native SDK provides components and functions for generating proofs in React Native applications.

## Installation

To use any of the components or functions in this SDK, install the package:

```bash
npm install @plutoxyz/react-native-sdk
# or
yarn add @plutoxyz/react-native-sdk
```

After installing, for iOS projects, run pod install:

```bash
cd ios && pod install
```

> **Note:** This SDK currently supports iOS only. Android support is planned for future releases.

## Components

- [ProofGenerator](./ProofGenerator.md) - Complete solution for proof generation with UI
- [RequestBuilder](./RequestBuilder.md) - Foundational component for manifest handling

## Functions

- [generateProof](./generateProof.md) - Generate proofs from manifest objects
- [generateProofFromUrl](./generateProofFromUrl.md) - Generate proofs from manifest URLs

## Type Definitions

See the [Types Reference](./types.md) for detailed type definitions used throughout the SDK, including:

- ManifestFile
- ManifestFileRequest
- ManifestFileResponse
- Mode and Methods enums

## Platform Support

| Platform | Support Status                 |
| -------- | ------------------------------ |
| iOS      | ✅ Fully Supported             |
| Android  | ❌ Planned for future releases |

## TypeScript Support

This SDK is written in TypeScript and includes type definitions for all components and functions.
