const wordCount = (str) => {
  return str.split(/\s+/).filter(Boolean).length;
};

export { wordCount };