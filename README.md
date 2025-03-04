# @plutoxyz/react-native-sdk

A React Native wrapper for the PlutoSwiftSDK that enables Pluto proof generation and attestation capabilities in React Native applications.

> **Note:** This module currently supports iOS only. Android support is planned for future releases.

## Documentation

Full documentation is available in the [docs](./docs/index.md) directory:

## Installation

```bash
npm install @plutoxyz/react-native-sdk
```

### iOS Setup

_Note: Requires iOS 17.0 or higher_

After installing the package, run pod install in your iOS directory:

```bash
cd ios && pod install
```

## Usage

For more information on manifest and prepareJS, visit our [official docs](https://docs.pluto.xyz/guides/manifest-walkthrough)

```tsx
import React from "react";
import { ProofGenerator } from "@plutoxyz/react-native-sdk";

const MyComponent = () => {
  const myManifest: ManifestFile = {
    // Your manifest object structure
  };

  const handleProofGenerated = (proof: string) => {
    console.log("Proof generated:", proof);
  };

  return (
    <ProofGenerator
      manifest={myManifest}
      // if using prepareJS it would be hosted at https://example.com/prepare.js
      onProofGenerated={handleProofGenerated}
    />
  );
};
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
