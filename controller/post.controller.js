class PostController {
    async getPosts(_, res) {
        const posts = await db.query('SELECT * FROM post');
        res.json(posts?.rows ?? []);
    }
    async getOnePost(req, res) {
        const { id } = req.params;
        const posts = await db.query('SELECT * FROM post WHERE id = $1', [id]);
        res.json(posts?.rows ?? []);
    }
    async getUserPosts(req, res) {
        const { user_id } = req.params;
        const posts = await db.query('SELECT * FROM post WHERE person_id = $1', [user_id]);
        res.json(posts?.rows ?? []);
    }
    async createPost(req, res) {
        const { user_id, title, content } = req.body;
        const newPost = await db.query('INSERT INTO post (person_id, title, content) VALUES ($1, $2, $3) RETURNING *', [
            user_id,
            title,
            content
        ]);
        res.json(newPost?.rows?.[0]);
    }
    async updatePost(req, res) {
        const { id, title, content } = req.body;
        const posts = await db.query('UPDATE post SET title = $1, content = $2 WHERE id = $3', [title, content, id]);
        res.json(posts?.rows?.[0]);
    }
    async deletePost(req, res) {
        const { id } = req.params;
        const posts = await db.query('DELETE FROM post WHERE id = $1', [id]);
        res.json(!!posts?.rowCount);
    }
}

module.exports = new PostController();
