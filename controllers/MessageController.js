const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.render('messages', { messages });
  } catch (error) {
    console.error('Errore durante il recupero dei messaggi:', error);
    req.flash('message', 'Errore durante il recupero dei messaggi, riprova più tardi.');
    res.redirect('/dashboard');
  }
};

const deleteMessage = async (req, res) => {
    try {
      const deleteId = req.params.id;
      if (!deleteId) {
        return res.status(400).json({ message: 'ID messaggio non fornito' });
      }
  
      const message = await Message.findByPk(deleteId);
      if (!message) {
        return res.status(404).json({ message: 'Messaggio non trovato' });
      }
  
      await Message.destroy({ where: { id: deleteId } });
      res.status(200).json({ message: 'Messaggio eliminato con successo' });
    } catch (error) {
      console.error("Errore durante l'eliminazione del messaggio:", error);
      res.status(500).json({ message: 'Errore durante l\'eliminazione del messaggio, riprova più tardi.' });
    }
  };
  
  module.exports = {getMessages,deleteMessage};
  