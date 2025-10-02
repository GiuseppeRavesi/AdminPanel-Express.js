const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.session.admin.id;
    
    const { name, old_pass, new_pass, confirm_pass } = req.body;

    if (name && name.trim()) {
      const sanitizedName = name.trim();
      const existingAdmin = await Admin.findOne({ where: { name: sanitizedName } });
      if (existingAdmin) {
        req.flash('message', 'Username già utilizzato!');
        return res.redirect('/update_profile');
      } else {
        await Admin.update({ name: sanitizedName }, { where: { id: adminId } });
        req.flash('message', 'Nome aggiornato con successo!');
      }
    }

    if (old_pass && new_pass && confirm_pass) {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        req.flash('message', 'Profilo admin non trovato!');
        return res.redirect('/update_profile');
      }

      const isOldPasswordValid = await bcrypt.compare(old_pass, admin.password);
      if (!isOldPasswordValid) {
        req.flash('message', 'Vecchia password non corretta!');
        return res.redirect('/update_profile');
      } else if (new_pass !== confirm_pass) {
        req.flash('message', 'La password di conferma non coincide!');
        return res.redirect('/update_profile');
      } else {
        const hashedPassword = await bcrypt.hash(new_pass, 10);
        await Admin.update({ password: hashedPassword }, { where: { id: adminId } });
        req.flash('message', 'Password aggiornata con successo!');
      }
    }

    res.redirect('/update_profile');
  } catch (error) {
    console.error("Errore durante l'aggiornamento del profilo admin:", error);
    req.flash('message', 'Si è verificato un errore, riprova più tardi.');
    res.redirect('/update_profile');
  }
};

module.exports = { updateAdminProfile };