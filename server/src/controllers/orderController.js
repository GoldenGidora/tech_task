const Order = require('../models/order');

class OrderController {
    static async getOrders(req, res) {
        try {
            const orders = await Order.findAll();
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getOrderById(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createOrder(req, res) {
        try {
            const newOrder = await Order.create(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateOrder(req, res) {
        try {
            const updatedOrder = await Order.update(req.params.id, req.body);
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteOrder(req, res) {
        try {
            const deletedOrder = await Order.delete(req.params.id);
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(deletedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = OrderController;
