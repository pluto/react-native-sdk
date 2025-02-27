export type ManifestFile = {
  manifestVersion: string;
  id: string;
  title: string;
  description: string;
  prepareUrl?: string;
  mode?: Mode;
  request: ManifestFileRequest;
  response: ManifestFileResponse;
  debugLogs?: string[];
};

export type ManifestFileRequest = {
  method: Methods;
  url: string;
  headers: Record<string, string>;
  body: string | null;
  vars?: ManifestVars;
  extra?: Partial<ManifestFileRequest>;
};

export type ManifestFileResponse = {
  status: string;
  headers: Record<string, string>;
  cookies?: string[];
  body: {
    json: string[];
  };
};

export enum Methods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum Mode {
  TLSN = 'TLSN',
  Origo = 'Origo',
  TEE = 'TEE',
  Proxy = 'Proxy',
}

export type ManifestVars = {
  [key: string]: {
    type?: string;
    regex?: string;
    length?: number;
  };
};
