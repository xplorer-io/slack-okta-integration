import dotenv from "dotenv";
import { syncUsers } from "./services/userSync";
dotenv.config({ path: "./.env.local" });

syncUsers();
