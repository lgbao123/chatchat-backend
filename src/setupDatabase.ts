import mongoose from "mongoose";
import "dotenv/config.js";

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const db_name = process.env.DB_NAME
export default () => {

   const connect = () => {
      mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.yq4kyma.mongodb.net/${db_name}?retryWrites=true&w=majority`)
         .then(() => console.log('Successfully connected to database!'))
         .catch(() => {
            console.log('Error connecting to database');
            // process.exit(1);
         })
   }
   connect()
}