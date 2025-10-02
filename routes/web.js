const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { Op } = require('sequelize');

const dashboardController = require('../controllers/DashboardController');
const authController = require('../controllers/AuthController');
const updateProfile = require('../controllers/UpdateProfileController');
const productController = require('../controllers/ProductController');
const orderController = require('../controllers/OrderController');
const adminController= require('../controllers/AdminController');
const userController = require('../controllers/UserController');
const messageController = require('../controllers/MessageController');


const loadDashboardData = [
    dashboardController.getDashboardData,
    dashboardController.renderDashboard
  ];

router.get('/', loadDashboardData);
router.get('/dashboard', loadDashboardData);

//Login
router.get('/admin_login', (req, res) => {
    res.render('admin_login');
});
router.post('/login_admin', authController.authenticateAdmin);

//Register
router.get('/admin_register', (req, res) =>{
  res.render('admin_register');
});
router.post('/register', authController.registerAdmin);

//Logout
router.get('/admin_logout', authController.logoutAdmin);

//update profile
router.get('/update_profile', (req, res) =>{
  res.render('update_profile');
});
router.post('/updateProfile', updateProfile.updateAdminProfile);

//product page
router.get('/products', productController.getProducts);
router.post('/addProducts', productController.addProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/update_product/:id', productController.getProducts);
router.post('/updateProduct', productController.updateProduct);

//placed_order
router.get('/placed_orders', orderController.getOrders);
router.post('/update_payment_status', orderController.updatePaymentStatus);
router.get('/delete_order/:id', orderController.deleteOrder);

//admin accounts
router.get('/admin_accounts', async (req, res) => {
  try {
    const loggedAdminId = req.session.admin.id;
    const admins = await Admin.findAll({
      where: {
        id: {
          [Op.ne]: loggedAdminId 
        }
      }
    });
    res.render('admin_account', { admins });
  } catch (error) {
    console.error('Errore durante il recupero degli account admin:', error);
    req.flash('message', 'Errore durante il recupero degli account admin, riprova più tardi.');
    res.redirect('/dashboard');
  }
});

router.delete('/delete_admin/:id', adminController.deleteAdmin);

//user_account
router.get('/user_account', userController.getUsers);
router.delete('/delete_users/:id', userController.deleteUser);

//messages
router.get('/messages', messageController.getMessages);
router.delete('/delete_messages/:id', messageController.deleteMessage);


module.exports = router;