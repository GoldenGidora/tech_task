const { db } = require('../db');

class Order {
    static async findAll() {
        return await db.any('SELECT * FROM orders');
    }

    static async findById(id) {
        const query = `
            SELECT *
            FROM orders
            WHERE id = $1
        `;
        return await db.oneOrNone(query, id);
    }

    static async create(order) {
        const query = `
            INSERT INTO orders(user_id, amount)
            VALUES($1, $2)
            RETURNING *
        `;
        return await db.one(query, [order.user_id, order.amount]);
    }

    static async update(id, updatedOrder) {
        const query = `
            UPDATE orders
            SET amount = $2, status = $3
            WHERE id = $1
            RETURNING *
        `;
        return await db.one(query, [id, updatedOrder.amount, updatedOrder.status]);
    }

    static async delete(id) {
        const query = `
            DELETE FROM orders
            WHERE id = $1
            RETURNING *
        `;
        return await db.one(query, id);
    }
}

module.exports = Order;
