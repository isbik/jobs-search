export const clearSearch = (search: Record<string, unknown>) => {
  return Object.keys(search).reduce(
    (acc, key) => {
      if (search[key] !== undefined && search[key] !== null) {
        acc[key] = search[key];
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );
};
