module.exports = (args) => {
  const { offset, searchTerm, sort } = args;
  const limit = 10;

  const query = searchTerm ? { name: {
    $regex: searchTerm, 
    $options: "i"
  }} : {};

  const options = {
    sort: {
      name: sort
    },
    offset: offset * limit, 
    limit
  };

  if (sort === 'newest' || sort === 'older') {
    options.sort = {
      created: sort === 'newest' ? 1 : -1
    }
  }

  return {
    query,
    options
  }
}