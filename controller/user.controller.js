const db = require('../db');

class UserController {
    createUser = async (req, res) => {
        const { name, surname, password, email, is_admin } = req.body;

        try {
            if (!name || !password || !email) throw new Error('Invalid data');

            const newPerson = await db.query(
                'INSERT INTO person (name, surname, password, email, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, surname, password, email, is_admin]
            );
            res.status(200).json(newPerson?.rows?.[0]);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    getUsers = async (_, res) => {
        const persons = await db.query('SELECT * FROM person');
        res.status(200).json(persons?.rows ?? []);
    };
    getOneUser = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw new Error('Invalid data');

            const users = await db.query('SELECT * FROM person WHERE id = $1', [id]);
            res.status(200).json(users?.rows?.[0]);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    getUserByPassword = async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) throw new Error('Invalid data');

            const users = await db.query('SELECT * FROM person WHERE email = $1 AND password = $2', [email, password]);
            res.status(200).json(users?.rows?.[0]);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    updateUser = async (req, res) => {
        const { id, name, surname, password, email, is_admin } = req.body;

        try {
            if (!id || !name || !password || !email) throw new Error('Invalid data');

            const users = await db.query(
                'UPDATE person SET name = $1, surname = $2, password = $3, email = $4, is_admin = $5 WHERE id = $6',
                [name, surname, password, email, is_admin, id]
            );
            res.status(200).json(users?.rows?.[0]);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
    deleteUser = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw new Error('Invalid data');

            const users = await db.query('DELETE FROM person WHERE id = $1', [id]);
            res.status(200).json(!!users?.rowCount);
        } catch (ex) {
            res.status(400).json({ Error: ex });
        }
    };
}

module.exports = new UserController();
