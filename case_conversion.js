const convertCase = (str, toUpperCase = true) => {
  return toUpperCase ? str.toUpperCase() : str.toLowerCase();
};

export { convertCase };
