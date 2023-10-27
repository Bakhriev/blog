import UserModel from "../../models/user.js"
import { compare } from "bcrypt"
import Jwt from "jsonwebtoken"

export const handleLogin = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json("Пользователь не найден")
		}

		const isValidPassword = await compare(
			req.body.password,
			user._doc.passwordHash
		)

		if (!isValidPassword) {
			return res.status(404).json("Неверный логин или пароль")
		}

		const token = Jwt.sign({ _id: user._id }, "ldldld", { expiresIn: "30d" })
		const { passwordHash, ...userData } = user._doc

		return res.status(200).json({
			token,
			...userData
		})
	} catch (error) {
		console.log(`Ошибка при авторизации: ${error}`)
		return res.status(500).json("Не удалось авторизоваться")
	}
}
