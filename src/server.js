const { ApolloServer, gql, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

//.env
require("dotenv").config({ path: ".env" });

//graphql
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

//db
const connectDB = require("./config/db");
connectDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(token.replace('Bearer ',''), process.env.KEY_TOKEN);
        return {
          user,
        };
      } catch (error) { }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`server runing on ${url}`);
});
