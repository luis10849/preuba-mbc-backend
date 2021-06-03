const {gql} = require("apollo-server")

const typeDefs = gql`
    
    type Recipe {
        id: ID
        photoUrl: String
        description: String
        ingredients: [String]
    }

   
     input UserInput {
         email: String!
         password: String!
     }

     input RecipeInput {
         photoUrl: String
         description: String
         ingredients: [String]
     }

     type Token {
         token: String
     }

     type Query {
        hello : String
        getRecipes : [Recipe]
        validToken : Token
     }

     type Mutation {
         register(input: UserInput) : String
         login(input: UserInput) : Token
         createRecipe(input: RecipeInput) : Recipe

    }
`

module.exports = typeDefs