const User = require("../models/User");
const Recipe = require("../models/Recipe");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");

const createToken = (user, key, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, key, { expiresIn });
};

const resolvers = {
  Query: {
    hello: () => "Hello",
    getRecipes: async (_, {}, ctx) => {
      const user = ctx.user;
      if (!user) {
        throw new AuthenticationError("Unauthenticated");
      }

      try {
        const recipes = await Recipe.find();
        return recipes;
      } catch (error) {
        console.log(error);
      }
    },
    validToken: async (_, {}, ctx) => {
      const user = ctx.user;
      if (!user) {
        throw new AuthenticationError("Unauthenticated");
      }

      return {
        token: createToken(user, process.env.KEY_TOKEN, "4hr"),
      };

    }
  },
  Mutation: {
    register: async (_, { input }) => {
      const { email, password } = input;

      const user = await User.findOne({ email });

      if (user) {
        throw new Error("Email is taken");
      }

      try {
        input.password = await bcrypt.hash(password, 6);

        const newUser = new User(input);
        await newUser.save();

        return "User created successfully";
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      console.log(input)
      const user = await User.findOne({
        email,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error("Password is incorrect");
      }
      return {
        token: createToken(user, process.env.KEY_TOKEN, "4hr"),
      };
    },
    createRecipe: async (_, { input }) => {
      console.log(input);
      try {
        const recipe = new Recipe(input);
        return await recipe.save();
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
