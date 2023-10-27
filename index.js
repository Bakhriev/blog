import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import { registerValidation } from "./validations/auth.js"

import { handleLogin } from "./routes/auth/login.js"
import { handleRegister } from "./routes/auth/register.js"

dotenv.config()
const app = express()
app.use(express.json())

mongoose
	.connect(process.env.DB_KEY)
	.then(() => {
		console.log("База данных подключена.")
	})
	.catch(error => console.log(`Ошибка при подключении к базе данных: ${error}`))

// Обработчики маршрутов ---------------------------------------------------------

app.get("/", (req, res) => {
	res.send("h1")
})

app.post("/auth/login", handleLogin)

app.post("/auth/register", registerValidation, handleRegister)

// Поднятие сервера ----------------------------------------------------------------

app.listen(process.env.PORT || 4444, () => {
	console.log(`Сервер успешно запущен на port: ${process.env.PORT || 3000}`)
})
