declare global {
  // eslint-disable-next-line no-unused-vars
  const require: {
    async: <T = any>(path: string) => Promise<{ default: T }>;
  };
}

export {};
