const db = require('../db');

class PostController {
    getUserPosts = async (req, res) => {
        const { user_id } = req.query;
        if (!user_id) {
            this.getFriendsPosts(req, res);
            return;
        }
        const posts = await db.query('SELECT * FROM post WHERE person_id = $1', [user_id]);
        res.status(200).json(posts?.rows ?? []);
    };
    getFriendsPosts = async (req, res) => {
        console.log('______________');
        console.log('getFriendsPosts', req);
        // todo Реализовать получение постов друзей
        const posts = await db.query('SELECT * FROM post');
        res.status(200).json(posts?.rows ?? []);
    };
    getOnePost = async (req, res) => {
        const { id } = req.params;
        const posts = await db.query('SELECT * FROM post WHERE id = $1', [id]);
        res.status(200).json(posts?.rows ?? []);
    };
    createPost = async (req, res) => {
        const { user_id, title, content } = req.body;
        try {
            if (!user_id || !title || !content) throw new Error('Invalid data');

            const newPost = await db.query(
                'INSERT INTO post (person_id, title, content) VALUES ($1, $2, $3) RETURNING *',
                [user_id, title, content]
            );

            res.status(200).json(newPost?.rows?.[0]);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    updatePost = async (req, res) => {
        const { id, title, content } = req.body;

        try {
            if (!id || !title || !content) throw new Error('Invalid data');

            const posts = await db.query('UPDATE post SET title = $1, content = $2 WHERE id = $3', [
                title,
                content,
                id
            ]);
            res.json(posts?.rows?.[0]);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    deletePost = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw new Error('Invalid data');

            const posts = await db.query('DELETE FROM post WHERE id = $1', [id]);
            res.json(!!posts?.rowCount);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
}

module.exports = new PostController();
