export const applyDataToEntity = <T extends object>(
  entity: T,
  data: Partial<T>,
) => {
  for (const [key, value] of Object.entries(data)) {
    entity[key] = value;
  }
};
