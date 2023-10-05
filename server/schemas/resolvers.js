// import authentication error and
const { AuthenticationError } = require("apollo-server-express");
// import the User and Book models
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth.js");

const resolvers = {
  Query: {
    user: async (_, __, context) => {
      // check if authenticated
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }

      // return user
      throw new AuthenticationError("You are not logged in!!");
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const userAlreadyMade = await User.findOne({ email });

      if (userAlreadyMade) {
        throw new AuthenticationError("Someone is using this email!! ): ");
      }

      const makeUser = await User.create({
        username,
        email,
        password,
      });

      const token = signToken(makeUser);
      return { token, user: makeUser };
    },

    saveBook: async (_, { input }, context) => {
      const user = await User.findOneAndUpdate(
        { $push: { savedBooks: bookData } },
        { new: true }
      );

      return user;

      if (!context.user) {
        throw new AuthenticationError("Please, log in first.");
      }
    },
    //   if (logIn.savedBooks.some((book) => book.bookId === input.bookId)) {
    //   const logIn = await User.findOne({ _id: context.user._id });
    //     return logIn;
    //   }
    //   logIn.savedBooks.push(input);
    //   await logIn.save();
    //   returnlogIn;

    removeBook: async (_, { bookId }, context) => {
      // check if authenticated
      if (!context.user) {
        throw new AuthenticationError("Not logged in!!");
      }

      const user = await user.findOne({ _id: context.user._id });
      user.savedBooks = user.savedBooks.filter(
        (book) => book.bookId !== bookId
      );
      await user.save();

      return user;
    },

    // login user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !user.isCorrectPassword(password)) {
        throw new AuthenticationError("Wrong username or password");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
