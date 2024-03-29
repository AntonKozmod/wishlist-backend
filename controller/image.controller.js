const db = require('../db');
const path = require('path');

class PostController {
    getImages = async (req, res) => {
        const { user_id, post_id } = req.query;
        if (!user_id && !post_id) {
            res.json([]);
            return;
        }
        const posts = await db.query('SELECT * FROM image WHERE person_id = $1 OR post_id = $2', [user_id, post_id]);
        res.status(200).json(posts?.rows ?? []);
    };
    getOneImage = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw new Error('Invalid data');

            const posts = await db.query('SELECT * FROM post WHERE id = $1', [id]);
            res.status(200).json(posts?.rows ?? []);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    createImage = async (req, res) => {
        try {
            if (!req.files?.length) throw new Error('No file uploaded');

            const { file } = req.files;
            const filename = encodeURI(Date.now() + '-' + file.name);

            const filepath = path.join('uploads', 'images', filename);

            file.mv(path.join(__dirname, filepath), err => {
                if (err) res.status(500).json({ internal_error: err });

                this.saveImagePath(
                    {
                        ...req,
                        body: {
                            ...req.body,
                            file_name: filename,
                            file_path: filepath
                        }
                    },
                    res
                );
            });
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    saveImagePath = async (req, res) => {
        const { file_name, file_path, person_id, post_id } = req.body;

        try {
            if (!file_name || !file_path || !person_id || !post_id) throw new Error('Invalid data');

            const newImage = await db.query(
                'INSERT INTO image (file_name, file_path, person_id, post_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [file_name, file_path, person_id, post_id]
            );
            res.status(200).json(newImage?.rows?.[0]);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    deleteImage = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw new Error('Invalid data');

            const posts = await db.query('DELETE FROM image WHERE id = $1', [id]);
            res.status(200).json(!!posts?.rowCount);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
}

module.exports = new PostController();
