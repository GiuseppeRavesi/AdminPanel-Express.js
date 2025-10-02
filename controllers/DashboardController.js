const Admin = require('../models/Admin');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Message = require('../models/Message');

const getDashboardData = async (req, res, next) => {
    try {
        const [totalPendings, totalCompleted, totalOrders, totalProducts, users, admins, messages] = await Promise.all([
            Order.findAll({ where: { payment_status: 'pending' } }),
            Order.findAll({ where: { payment_status: 'COMPLETED' } }),
            Order.findAll(),
            Product.findAll(),
            User.findAll(),
            Admin.findAll(),
            Message.findAll()
        ]);

        req.total_pendings = totalPendings.reduce((sum, order) => sum + order.total_price, 0);
        req.total_completed = totalCompleted.reduce((sum, order) => sum + order.total_price, 0);
        req.totalOrders = totalOrders;
        req.totalProducts = totalProducts;
        req.users = users;
        req.admins = admins;
        req.messages = messages;
        next();
    } catch (error) {
        console.error('Errore durante il recupero dei dati della dashboard:', error);
        res.status(500).send('Errore durante il recupero dei dati della dashboard.');
    }
};

const renderDashboard = (req, res) => {
    res.render('dashboard', {
        total_pendings: req.total_pendings || 'N/A',
        total_completed: req.total_completed || 'N/A',
        total_orders: req.totalOrders.length || 'N/A',
        numbers_of_products: req.totalProducts.length || 'N/A',
        number_users: req.users.length || 'N/A',
        number_admins: req.admins.length || 'N/A',
        number_messages: req.messages.length || 'N/A'
    });
};

module.exports = {
    getDashboardData,
    renderDashboard
};
