const Order = require('../models/Order');

const getOrders = async (req, res) => {
    const status = req.query.status;
    let orders;
    try {
        if (status) {
             orders = await Order.findAll({ where: { payment_status: status } });       
        }else{
             orders = await Order.findAll();
        }
        return res.render('placed_orders', { orders, status });
    } catch (error) {
        console.error('Errore durante il recupero degli ordini:', error);
        res.status(500).send('Errore durante il recupero degli ordini.');
    }

}

const updatePaymentStatus = async (req, res) => {
    try {
      const { order_id, payment_status } = req.body;

      if (!order_id || !payment_status) {
        req.flash('message', 'ID ordine o stato di pagamento non forniti');
        return res.redirect('/placed_orders');
      }

      await Order.update(
        { payment_status },
        { where: { id: order_id } }
      );
  
      req.flash('message', 'Stato di pagamento aggiornato con successo!');
      res.redirect('/placed_orders');
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dello stato di pagamento:', error);
      req.flash('message', 'Si è verificato un errore durante l\'aggiornamento dello stato di pagamento, riprova più tardi.');
      res.redirect('/placed_orders');
    }
  };
  
  const deleteOrder = async (req, res) => {
    try {
      const deleteId = req.params.id;

      if (!deleteId) {
        req.flash('message', 'ID ordine non fornito');
        return res.redirect('/placed_orders');
      }
  
      await Order.destroy({ where: { id: deleteId } });
  
      req.flash('message', 'Ordine eliminato con successo!');
      res.redirect('/placed_orders');
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'ordine:', error);
      req.flash('message', 'Si è verificato un errore durante l\'eliminazione dell\'ordine, riprova più tardi.');
      res.redirect('/placed_orders');
    }
  };


module.exports = {getOrders, updatePaymentStatus, deleteOrder};