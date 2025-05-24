
import express, {Request, Response} from "express"
import schoolRouter from "./routes/school.routes"
const app = express()

app.get("/", (req:Request, res:Response) => {
    res.send("Hello World")
})

app.use("/api/v1", schoolRouter)

app.listen(3000, () => {
    console.log(`Server is running on port: http://localhost:${3000}`)
})