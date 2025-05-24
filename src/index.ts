
import "dotenv/config"
import express, {NextFunction, Request, Response} from "express"
import schoolRouter from "./routes/school.routes"
import { CustomError } from "./utils"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const port = process.env.PORT || 3000

app.get("/", (req:Request, res:Response) => {
    res.send("Hello World")
})

app.use("/api/v1", schoolRouter)


app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.error || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});


app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`)
})