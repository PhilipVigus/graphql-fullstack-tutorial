require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");

const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

// sets up the SQLite database
const store = createStore();

const server = new ApolloServer({
  typeDefs,
  // pass the datasources into the server
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    // pass the database into the userapi
    userAPI: new UserAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
