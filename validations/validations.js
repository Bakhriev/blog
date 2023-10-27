import { body } from "express-validator"

export const registerValidate = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Пароль должен быть минимум 5 символов").isLength({
		min: 5
	}),
	body("fullName", "Имя должен содержать минимум 3 символов").isLength({
		min: 3
	}),
	body("avatarUrl", "Недопустимый URL-адрес аватара").optional().isURL()
]

export const loginValidate = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Пароль должен быть минимум 5 символов").isLength({
		min: 5
	})
]

export const postCreateValidate = [
	body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
	body("text", "Введите текст статьи").isLength({ min: 10 }).isString(),
	body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
	body("imageUrl", "Неверная ссылка на изображение").optional().isString()
]

export const postUpdateValidate = [
	body("title", "Введите заголовок статьи")
		.optional()
		.isLength({ min: 3 })
		.isString(),
	body("text", "Введите текст статьи")
		.optional()
		.isLength({ min: 10 })
		.isString(),
	body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
	body("imageUrl", "Неверная ссылка на изображение").optional().isString()
]
