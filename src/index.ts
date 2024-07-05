import express, { Express } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes"

dotenv.config()

const app: Express = express()
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/lanchoneteapi"

mongoose.connect(MONGO_URL)
mongoose.connection.on("error", (error:Error) => console.log(error))

const port = process.env.PORT || 3000

app.use("/", router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})