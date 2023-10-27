import PostModel from "../models/post.js"

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			user: req.userId
		})
		const post = await doc.save()
		res.json(post)
	} catch (error) {
		console.log(error)
		res.status(400).json("Не удалось создать статью")
	}
}

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate("user").exec()
		res.json(posts)
	} catch (error) {
		console.log(error)
		res.status(500).json("Ошибка при получении статей")
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id

		const updatedPost = await PostModel.findOneAndUpdate(
			{ _id: postId },
			{ $inc: { viewsCount: 1 } },
			{ new: true }
		)

		if (!updatedPost) {
			return res.status(404).json("Статья не найдена")
		}

		res.json(updatedPost)
	} catch (error) {
		console.log(error)
		res.status(500).json("Ошибка при получении статьи")
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		const deletedPost = await PostModel.findOneAndDelete({ _id: postId })

		if (!deletedPost) {
			return res.status(404).json("Пост не найден")
		}

		res.status(200).json({ message: "Пост успешно удален", deletedPost })
	} catch (error) {
		res.status(500).json("Ошибка при удалении статьи")
	}
}

export const update = async (req, res) => {
	const postId = req.params.id
	try {
		await PostModel.updateOne(
			{
				_id: postId
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				tags: req.body.tags,
				user: req.userId
			}
		)
		res.status(200).json("Статья обновлена")
	} catch (error) {
		console.log(error)
		res.status(500).json("Ошибка при обновление статьи")
	}
}
