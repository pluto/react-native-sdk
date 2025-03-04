# generateProofFromUrl Function

The `generateProofFromUrl` function is a convenience method for generating Pluto proofs directly from a manifest URL. It handles the fetching of the manifest and proof generation in a single call.

> **Note:** This function is part of the [@plutoxyz/react-native-sdk](./index.md) package.

## TypeScript Definition

```typescript
function generateProofFromUrl(url: string): Promise<string>;
```

## Usage

### Basic Usage

```typescript
import { generateProofFromUrl } from "@plutoxyz/react-native-sdk";

const generateMyProof = async () => {
  try {
    const manifestUrl = "https://example.com/manifest.json";
    const proof = await generateProofFromUrl(manifestUrl);
    console.log("Proof generated:", proof);
  } catch (error) {
    console.error("Error generating proof:", error);
  }
};
```

## Parameters

| Parameter | Type     | Required | Description                                              |
| --------- | -------- | -------- | -------------------------------------------------------- |
| `url`     | `string` | Yes      | The URL of the manifest file to use for proof generation |

## Return Value

The function returns a `Promise<string>` that resolves to the generated proof string.
