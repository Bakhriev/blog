import { validationResult } from "express-validator"
import { genSalt, hash } from "bcrypt"
import Jwt from "jsonwebtoken"

import UserModel from "../../models/user.js"

export const handleRegister = async (req, res) => {
	try {
		const salt = await genSalt(10)
		const passwordHash = await hash(req.body.password, salt)

		const newUser = {
			fullName: req.body.fullName,
			email: req.body.email,
			passwordHash,
			avatarUrl: req.body.avatarUrl
		}

		const user = await UserModel.create(newUser)

		const token = Jwt.sign({ _id: user._id }, "ldldld", { expiresIn: "30d" })

		const { fullName, email, _id } = user._doc

		return res.status(200).json({
			msg: "Успешно зарегистрирован",
			user: {
				_id,
				fullName,
				email,
				token
			}
		})
	} catch (error) {
		console.log(`Ошибка при регистрации: ${error}`)
		return res.status(500).json("Не удалось зарегистрироваться")
	}
}
