const graphql = require('graphql');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;
const _ = require('lodash');

const users = [
  { id: "23", firstName: 'Bill', age: 40 },
  { id: "24", firstName: 'Joe', age: 28 },
  { id: "25", firstName: 'Mario', age: 34 },
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      }
    }
  },
})

const NameQuery = new GraphQLObjectType({
  name: 'NameQueryType',
  fields: {
    user: {
      type: UserType,
      args: { firstName: { type: GraphQLString }},
      resolve(parentValue, args) {
        return _.find(users, { firstName: args.firstName });
      }
    }
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
});
module.exports = new GraphQLSchema({
  query: NameQuery,
});