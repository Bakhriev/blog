import UserModel from "../../models/user.js"

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)
		if (!user) {
			return res.status(404).json("Пользователь не найден")
		}
		const { fullName, email, _id, avatarUrl } = user
		return res.json({
			_id,
			fullName,
			email,
			avatarUrl
		})
	} catch (error) {
		return res.json({ error })
	}
}
