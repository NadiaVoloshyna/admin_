module.exports = (portrait) => {
  const [url, _id] = portrait.split('|');
  return { url, _id };
};
