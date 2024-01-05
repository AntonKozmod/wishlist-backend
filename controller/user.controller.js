const db = require('../db');

class UserController {
    async createUser(req, res) {
        const { name, surname, password, email, is_admin } = req.body;
        const newPerson = await db.query('INSERT INTO person (name, surname, password, email, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, surname, password, email, is_admin]);
        res.json(newPerson?.rows?.[0]);
    }
    async getUsers(_, res) {
        const persons = await db.query('SELECT * FROM person');
        res.json(persons?.rows ?? []);
    }
    async getOneUser(req, res) {
        const { id } = req.params;
        const users = await db.query('SELECT * FROM person WHERE id = $1', [id]);
        res.json(users?.rows?.[0]);
    }
    async getUserByPassword(req, res) {
        const { email, password } = req.body;
        const users = await db.query('SELECT * FROM person WHERE email = $1 AND password = $2', [email, password]);
        res.json(users?.rows?.[0]);
    }
    async updateUser(req, res) {
        const { id, name, surname, password, email, is_admin } = req.body;
        const users = await db.query('UPDATE person SET name = $1, surname = $2, password = $3, email = $4, is_admin = $5 WHERE id = $6', [name, surname, password, email, is_admin, id]);
        res.json(users?.rows?.[0]);
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        const users = await db.query('DELETE FROM person WHERE id = $1', [id]);
        res.json(!!users?.rowCount);

    }
}

module.exports = new UserController();