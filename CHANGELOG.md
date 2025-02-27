# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1-alpha.1] - 2024-02-27

### Added

- Initial alpha release of the React Native SDK
- `RequestBuilder` component for building and processing manifest requests
- `ProofGenerator` component for generating proofs from manifests
- Native bridge to PlutoSwiftSDK via `PlutoProver` module
- Direct API functions: `generateProof` and `generateProofFromUrl`
- TypeScript type definitions for manifests and related structures
- Example application demonstrating SDK usage
- iOS integration via Swift with proper bridging
- Android module skeleton

### Known Issues

- Android implementation is not available in this release (iOS only)
- Example app could be more comprehensive

### Next Steps

- Enhance example application
- Improve error handling and user feedback
- Prepare for beta release
