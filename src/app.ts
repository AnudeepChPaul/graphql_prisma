import dotenv from "dotenv";
dotenv.config();

import { startServer } from "./server.js";

startServer().then(({ url }) => { 
  console.log(`Server started at ${url}. Visit ${url}graphql to run queries.`)
})
