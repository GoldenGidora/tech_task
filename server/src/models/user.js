const { db } = require('../db');

class User {
    static async findAll() {
        return await db.any('SELECT * FROM users');
    }

    static async findById(id) {
        const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
        return await db.oneOrNone(query, id);
    }

    static async create(user) {
        const query = `
            INSERT INTO users(name, email)
            VALUES($1, $2)
            RETURNING *
        `;
        return await db.one(query, [user.name, user.email]);
    }

    static async update(id, updatedUser) {
        const query = `
            UPDATE users
            SET name = $1, email = $2
            WHERE id = $3
            RETURNING *
        `;
        return await db.one(query, [updatedUser.name, updatedUser.email, id]);
    }

    static async delete(id) {
        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING *
        `;
        return await db.one(query, id);
    }
}

module.exports = User;
