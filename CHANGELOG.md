# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2025-3-5

### Added

- Added repo information to package.json for NPM

## [0.0.2] - 2025-3-5

### Added

- Initial release of the React Native SDK

## [0.0.2-alpha.3] - 2025-3-4

### Fixed

- Fixed issue with RequestBuilder not handling scenario where prepareUrl is not provided

## [0.0.2-alpha.2] - 2025-2-28

### Added

- Comprehensive example for ProofGenerator component

### Changed

- Moved React and React Native to peerDependencies
- Improved documentation for ProofGenerator component
- Enhanced TypeScript type definitions

### Fixed

- Component dependency issues
- Platform null reference checks
- Error handling improvements

## [0.0.2-alpha.1] - 2025-02-27

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
