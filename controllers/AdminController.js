const Admin = require('../models/Admin');

const deleteAdmin = async (req, res) => {
  try {
    const deleteId = req.params.id;

    if (!deleteId) {
      return res.status(400).json({ message: 'ID admin non fornito' });
    }

    const admin = await Admin.findByPk(deleteId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin non trovato' });
    }

    await Admin.destroy({ where: { id: deleteId } });

    res.status(200).json({ message: 'Admin eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione dell\'admin:', error);
    res.status(500).json({ message: 'Si è verificato un errore, riprova più tardi.' });
  }
};

module.exports = { deleteAdmin };
