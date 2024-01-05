class UserController {
    async createUser(req, res) {
        res.send('createUser')
    }
    async getUsers(req, res) {
        res.send('getUsers')
    }
    async getOneUser(req, res) {
        res.send('getOneUser')
    }
    async updateUser(req, res) {
        res.send('updateUser')
    }
    async deleteUser(req, res) {
        res.send('deleteUser')
    }
}

module.exports = new UserController();