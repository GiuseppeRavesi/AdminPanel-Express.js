const Product = require('../models/Product');
const Cart = require('../models/Cart');
const path = require('path');
const fs = require('fs');

const getProducts = async (req, res) => {
  try {
    const productId = req.params.id;

    if (productId) {
      const product = await Product.findByPk(productId);
      if (product) {
        return res.render('update_product', { product });
      } else {
        req.flash('message', 'Prodotto non trovato');
        return res.redirect('/products');
      }
    } else {
      const products = await Product.findAll({
        order: [['id', 'DESC']]
      });
      return res.render('products', { products });
    }
  } catch (error) {
    console.error('Errore durante il recupero dei prodotti:', error);
    res.status(500).send('Errore durante il recupero dei prodotti.');
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const sanitizedName = name.trim();
    const sanitizedPrice = price.trim();
    const sanitizedCategory = category.trim();

    const existingProduct = await Product.findOne({ where: { name: sanitizedName } });
    if (existingProduct) {
      req.flash('message', 'Nome prodotto già esistente');
      return res.redirect('/products');
    }

    if (req.files && req.files.image) {
      const image = req.files.image;
      if (image.size > 2000000) {
        req.flash('message', 'La dimensione dell\'immagine è troppo grande');
        return res.redirect('/products');
      }

      const imagePath = path.join(__dirname, '..', 'public', 'project_images', image.name);
      
      image.mv(imagePath, async (err) => {
        if (err) {
          console.error('Errore durante il caricamento dell\'immagine:', err);
          req.flash('message', 'Errore durante il caricamento dell\'immagine');
          return res.redirect('/products');
        }

        try {
          await Product.create({
            name: sanitizedName,
            category: sanitizedCategory,
            price: sanitizedPrice,
            image: image.name
          });

          req.flash('message', 'Nuovo prodotto aggiunto con successo!');
          res.redirect('/products');
        } catch (dbError) {
          console.error('Errore durante inserimento del prodotto:', dbError);
          req.flash('message', 'Errore durante l\'inserimento del prodotto, riprova più tardi.');
          res.redirect('/products');
        }
      });
    } else {
      req.flash('message', 'Nessuna immagine fornita');
      return res.redirect('/products');
    }

  } catch (error) {
    console.error('Errore durante inserimento del prodotto:', error);
    req.flash('message', 'Errore durante l\'inserimento del prodotto, riprova più tardi.');
    return res.redirect('/products');
  }
};


const deleteProduct = async (req, res) => {
  try {
    const deleteId = req.params.id;

    if (!deleteId) {
      return res.status(400).json({ message: 'ID prodotto non fornito' });
    }

    const product = await Product.findByPk(deleteId);
    if (!product) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }

 
    await Product.destroy({ where: { id: deleteId } });

    await Cart.destroy({ where: { pid: deleteId } });

    res.status(200).json({ message: 'Prodotto eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione del prodotto:', error);
    res.status(500).json({ message: 'Si è verificato un errore, riprova più tardi.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid, name, price, category, old_image } = req.body;

    const sanitizedPid = pid.trim();
    const sanitizedName = name.trim();
    const sanitizedPrice = price.trim();
    const sanitizedCategory = category.trim();

    await Product.update(
      { name: sanitizedName, category: sanitizedCategory, price: sanitizedPrice },
      { where: { id: sanitizedPid } }
    );

    if (req.files && req.files.image) {
      const image = req.files.image;
      const imagePath = path.join(__dirname, '..', 'public', 'project_images', image.name);

      if (image.size > 2000000) {
        req.flash('message', 'La dimensione dell\'immagine è troppo grande');
        return res.redirect(`/update_product/${sanitizedPid}`);
      }

      if (fs.existsSync(imagePath)) {
        req.flash('message', 'Il nome dell\'immagine esiste già, scegli un altro nome per l\'immagine.');
        return res.redirect(`/update_product/${sanitizedPid}`);
      }

      await Product.update(
        { image: image.name },
        { where: { id: sanitizedPid } }
      );

      image.mv(imagePath, async (err) => {
        if (err) {
          console.error('Errore durante il caricamento dell\'immagine:', err);
          req.flash('message', 'Errore durante il caricamento dell\'immagine');
          return res.redirect(`/update_product/${sanitizedPid}`);
        }
      });

      req.flash('message', 'Prodotto aggiornato con successo!');
    }

    res.redirect('/products');
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del prodotto:', error);
    req.flash('message', 'Errore durante l\'aggiornamento del prodotto, riprova più tardi.');
    res.redirect('/products');
  }
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct };
