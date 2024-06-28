export const FieldCannotBeEmpty = (message: string): string | undefined => {
  if (message.length > 0) {
    return `${message} Field Cannot Be Empty`;
  }
};
