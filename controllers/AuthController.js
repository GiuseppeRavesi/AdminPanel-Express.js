const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const authenticateAdmin = async (req, res) => {
  const { name, pass } = req.body;

  try {
    const sanitizedName = name.trim();
    const sanitizedPassword = pass.trim();

    if(req.session.isLoggedIn){
      req.flash('message', 'Hai già effettuato il login');
      return res.redirect('/dashboard');
    }

    const admin = await Admin.findOne({ where: { name: sanitizedName } });

    if (!admin) {
      req.flash('message', 'Nome utente o password errati!');
      return res.redirect('/admin_login');
    }

    const isPasswordValid = await bcrypt.compare(sanitizedPassword, admin.password);

    if (!isPasswordValid) {
      req.flash('message', 'Nome utente o password errati!');
      return res.redirect('/admin_login');
    }

    req.session.isLoggedIn = true;
    req.session.admin = {
      id: admin.id,
      name: admin.name,
      super:admin.super
    };
    res.redirect('/dashboard');
    
  } catch (error) {
    console.error('Errore durante il processo di autenticazione:', error);
    req.flash('message', 'Si è verificato un errore, riprova più tardi.');
    res.redirect('/admin_login');
  }
};

const registerAdmin = async (req, res) => {
  const { name, pass, cpass } = req.body;

  try {
    const sanitizedName = name.trim();
    const sanitizedPassword = pass.trim();
    const sanitizedCPassword = cpass.trim();

    if (await Admin.findOne({ where: { name: sanitizedName } })) {
      req.flash('message', 'Admin già registrato');
      return res.redirect('/admin_register');
    }

    if (sanitizedCPassword !== sanitizedPassword) {
      req.flash('message', 'Le due password non coincidono');
      return res.redirect('/admin_register');
    }

    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);

    const newAdmin = Admin.build({
      name: sanitizedName,
      password: hashedPassword
    });
    await newAdmin.save();

    req.flash('message', 'Nuovo admin registrato con successo!');
    res.redirect('/admin_register');
  } catch (error) {
    console.error('Errore durante il processo di registrazione:', error);
    req.flash('message', 'Si è verificato un errore, riprova più tardi.');
    res.redirect('/admin_register');
  }
};


const logoutAdmin = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Errore durante la distruzione della sessione:', err);
        req.flash('message', 'Si è verificato un errore durante il logout.');
        return res.redirect('/dashboard');
      }
      res.redirect('/admin_login');
    });
  } catch (error) {
    console.error('Errore durante il logout:', error);
    req.flash('message', 'Si è verificato un errore, riprova più tardi.');
    res.redirect('/dashboard');
  }
};

module.exports = {
  authenticateAdmin,
  registerAdmin,
  logoutAdmin
};
