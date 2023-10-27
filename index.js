import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import {
	registerValidate,
	loginValidate,
	postCreateValidate,
	postUpdateValidate
} from "./validations/validations.js"

import { handleLogin } from "./routes/auth/login.js"
import { handleRegister } from "./routes/auth/register.js"
import { checkAuth } from "./utils/checkAuth.js"
import { getMe } from "./routes/auth/me.js"

import * as PostController from "./controllers/PostController.js"

dotenv.config()

const app = express()

app.use(express.json())

mongoose
	.connect(process.env.DB_KEY)
	.then(() => {
		console.log("База данных подключена.")
	})
	.catch(error => console.log(`Ошибка при подключении к базе данных: ${error}`))

app.get("/", (req, res) => {
	res.send("h1")
})

app.get("/auth/me", checkAuth, getMe)

//
app.get("/posts/:id", PostController.getOne)
app.get("/posts", PostController.getAll)

app.post("/auth/login", loginValidate, handleLogin)
app.post("/auth/register", registerValidate, handleRegister)

app.post("/posts", checkAuth, postCreateValidate, PostController.create)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id", checkAuth, postUpdateValidate, PostController.update)
//

app.listen(process.env.PORT || 4444, () => {
	console.log(`Сервер успешно запущен на port: ${process.env.PORT || 4444}`)
})

export default app
