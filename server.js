const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    ip(num: Int): String
  }
`);

const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.headers);
    next();
}

const root = {
    ip: function (args, request) {
        return request.headers.host;
    }
};

const app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
