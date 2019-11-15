const updatePerson = async (_source, args, { dataSources }) => {
  const { _id, name } = args;

  return await dataSources.Person.findOneAndUpdate(
    { _id },
    { $set: { name } },
    { new: true }
  );
}

module.exports = updatePerson;