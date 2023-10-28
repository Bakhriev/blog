import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import multer from "multer"

import {
	registerValidate,
	loginValidate,
	postCreateValidate,
	postUpdateValidate
} from "./validations/validations.js"

import { getMe, handleLogin, handleRegister } from "./routes/auth/index.js"

import { checkAuth, handleValidationErrors } from "./utils/index.js"

import * as PostController from "./controllers/PostController.js"

dotenv.config()

const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads")
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })

app.use(express.json())
app.use("/uploads", express.static("uploads"))

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

app.get("/posts/:id", PostController.getOne)
app.get("/posts", PostController.getAll)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
	try {
		res.json({
			url: `/uploads/${req.file.originalname}`
		})
	} catch (error) {
		res.json(error)
	}
})

app.post("/auth/login", loginValidate, handleValidationErrors, handleLogin)
app.post(
	"/auth/register",
	registerValidate,
	handleValidationErrors,
	handleRegister
)

app.post(
	"/posts",
	checkAuth,
	postCreateValidate,
	handleValidationErrors,
	PostController.create
)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch(
	"/posts/:id",
	checkAuth,
	postUpdateValidate,
	handleValidationErrors,
	PostController.update
)

app.listen(process.env.PORT || 4444, () => {
	console.log(`Сервер успешно запущен на port: ${process.env.PORT || 4444}`)
})

export default app
