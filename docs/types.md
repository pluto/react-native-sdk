# Types Reference

This document contains type definitions used throughout the Pluto React Native SDK.

## ManifestFile

The main manifest type used for proof generation and request building.

```typescript
interface ManifestFile {
  manifestVersion: string;
  id: string;
  title: string;
  description: string;
  mode: Mode;
  request: ManifestFileRequest;
  response: ManifestFileResponse;
}
```

### ManifestFileRequest

```typescript
interface ManifestFileRequest {
  method: Methods;
  url: string;
  headers: Record<string, string>;
  body: string | null;
  vars?: ManifestVars;
  extra?: Partial<ManifestFileRequest>;
}
```

### ManifestFileResponse

```typescript
interface ManifestFileResponse {
  status: string;
  headers: Record<string, string>;
  cookies?: string[];
  body: {
    json: string[];
  };
}
```

### ManifestVars

```typescript
interface ManifestVars {
  [key: string]: {
    type?: string;
    regex?: string;
    length?: number;
  };
}
```

## Enums

### Mode

There are 4 modes supported by the SDK. In the alpha versions of the SDK, there may be issues with modes other than TEE.

- TLSN
- Origo
- TEE [default]
- Proxy

```typescript
enum Mode {
  TLSN = "TLSN",
  Origo = "Origo",
  TEE = "TEE",
  Proxy = "Proxy",
}
```

### Methods

```typescript
enum Methods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
```
