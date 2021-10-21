const Express = require("express");
const { graphqlHTTP } = require("express-graphql");
const Mongoose = require("mongoose");
const resolver = require("./resolvers");

const {
GraphQLID,
GraphQLString,
GraphQLList,
GraphQLObjectType,
GraphQLSchema,
GraphQLNonNull
} = require("graphql");

var app = Express();

Mongoose.connect("mongodb://localhost/bancofuncional");

const contaModelo = Mongoose.model("conta", {
    id: ID,
    numero: String,
    saldo: Float,
    cliente: String
});

const ContaTipo = new GraphQLObjectType({
    nome: "Felipe",
    fields: {
        id: { type: GraphQLID},
        numero: { type: GraphQLString },
        saldo: { type: GraphQLFloat },
        cliente: { type: GraphQLString}
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        nome: "Query",
        campos: {
            pessoa: {
                type: GraphQLList(ContaTipo),
                resolve: (root, args, context, info) => {
                    return contaModelo.find().exec();
                }
            }
        }
    })
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true  
}));

app.listen(3000, () => {
    console.log("Ok");
})
