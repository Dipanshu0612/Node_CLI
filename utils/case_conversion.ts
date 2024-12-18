const convertCase = (str: string, toUpperCase: boolean = true): string => {
  return toUpperCase ? str.toUpperCase() : str.toLowerCase();
};

export { convertCase };
