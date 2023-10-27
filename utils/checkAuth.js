import Jwt from "jsonwebtoken"

export const checkAuth = async (req, res, next) => {
	const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

	if (token) {
		try {
			const decoded = Jwt.verify(token, "ldldld")
			req.userId = decoded._id
		} catch (error) {
			return res.status(403).json({
				message: "Ошибка"
			})
		}
	} else {
		return res.status(403).json({
			message: "Нет доступа"
		})
	}

	next()
}
