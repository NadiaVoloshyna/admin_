module.exports = (created) => {
  return (new Date() - new Date(created)) > 1000 * 60 * 60 * 24;
}