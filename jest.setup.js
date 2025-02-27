// Only mock the minimum needed parts of React Native
jest.mock("react-native", () => ({
  NativeModules: {
    PlutoProver: {
      showBrowserView: jest.fn().mockResolvedValue(true),
      generateProof: jest
        .fn()
        .mockResolvedValue({ proof: "mock-proof", publicInputs: ["input1"] }),
      generateProofFromUrl: jest
        .fn()
        .mockResolvedValue({ proof: "mock-proof", publicInputs: ["input1"] }),
    },
  },
  // Add anything else you absolutely need here
  StyleSheet: {
    create: (styles) => styles,
  },
}));

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
