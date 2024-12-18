const wordCount = (str: string): number => {
  return str.split(/\s+/).filter(Boolean).length;
};

export { wordCount };