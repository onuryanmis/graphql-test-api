import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
import {employees} from "./data/employee.js";

const typeDefs = `#graphql
type Employee {
    id: ID!
    fullName: String
    image: String
    email: String
    phone: String
    job: String
}

type Query {
    employee(id: ID!): Employee
    employees: [Employee]
}
`;

const resolvers = {
    Query: {
        employees: () => employees,
        employee: (parent, args) => {
            return employees.find(employee => employee.id.toString() === args.id);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const {url} = await startStandaloneServer(server, {listen: {port: 4000}});

console.log(`⚡ Server listening at: ${url}`);
