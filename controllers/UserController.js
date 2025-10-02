const User = require('../models/User');
const Cart = require('../models/Cart');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('user_account', { users });
  } catch (error) {
    console.error('Errore durante il recupero degli utenti:', error);
    req.flash('message', 'Errore durante il recupero degli utenti, riprova più tardi.');
    res.redirect('/dashboard');
  }
};

const deleteUser = async (req, res) => {
    try {
      const deleteId = req.params.id;
  
      if (!deleteId) {
        return res.status(400).json({ message: 'ID utente non fornito' });
      }
  
      const user = await User.findByPk(deleteId);
      if (!user) {
        return res.status(404).json({ message: 'Utente non trovato' });
      }
  
      await Cart.destroy({ where: { user_id: deleteId } });
  
      await User.destroy({ where: { id: deleteId } });
  
      res.status(200).json({ message: 'Utente eliminato con successo' });
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'utente:", error);
      res.status(500).json({ message: 'Errore durante l\'eliminazione dell\'utente, riprova più tardi.' });
    }
  };

module.exports = { getUsers, deleteUser };