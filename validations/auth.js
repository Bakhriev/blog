import { body } from "express-validator"

export const registerValidation = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Пароль должен быть минимум 5 символов").isLength({
		min: 5
	}),
	body("fullName", "Имя должен содержать минимум 3 символов").isLength({
		min: 3
	}),
	body("avatarUrl", "Недопустимый URL-адрес аватара").optional().isURL()
]
