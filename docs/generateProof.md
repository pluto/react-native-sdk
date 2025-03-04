# generateProof Function

The `generateProof` function is a direct method for generating Pluto proofs programmatically from a manifest object. It provides a straightforward way to generate proofs without using the React components.

> **Note:** This function is part of the [@plutoxyz/react-native-sdk](./index.md) package.

## TypeScript Definition

```typescript
function generateProof(manifest: ManifestFile): Promise<string>;
```

For detailed type definitions of `ManifestFile` and related types, see the [Types Reference](./types.md).

## Usage

### Basic Usage

```typescript
import { generateProof } from "@plutoxyz/react-native-sdk";

const generateMyProof = async () => {
  try {
    const manifest = {
      manifestVersion: "1.0.0",
      id: "example-manifest",
      title: "Example Manifest",
      description: "An example manifest for proof generation",
      mode: "TEE",
      request: {
        method: "GET",
        url: "https://api.example.com/data",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      },
      response: {
        status: "200",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          json: ["example-data"],
        },
      },
    };

    const proof = await generateProof(manifest);
    console.log("Proof generated:", proof);
  } catch (error) {
    console.error("Error generating proof:", error);
  }
};
```

## Parameters

| Parameter  | Type                                      | Required | Description                                                                       |
| ---------- | ----------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| `manifest` | [`ManifestFile`](./types.md#manifestfile) | Yes      | The manifest object containing the request and response data for proof generation |

## Return Value

The function returns a `Promise<string>` that resolves to the generated proof string.
