const createProfession = async (_source, args, { dataSources }) => {
  return await new dataSources.Profession({name: args.name}).save();
}

module.exports = createProfession;