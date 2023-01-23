const {workerService} = require('../services')



exports.createListing = async (req, res) => {
    const listing = await workerService.createListing(req.body)
    res.send(listing)
}

const signupWorker = async (req, res) => {
    // hace referencia a los id en los módulos HTML
    let { nombre, apellido, direccion, celular, cedula, foto, email, password } = req.body;
  
    let errors = [];
  
    console.log({
      nombre,
      apellido,
      direccion,
      celular,
      cedula,
      foto,
      email,
      password
      
    });
  
    if (!nombre || !apellido || !direccion || !celular || !cedula || !foto || !email || !password) {
      errors.push({ message: "Por favor complete todos los campos" });
    }
  
    if (password.length < 4) {
      errors.push({ message: "La contraseña debe ser de almenos 4 caracteres" });
    }
  
    if (errors.length > 0) {
        // aqui va la vista
        res.sendFile(__dirname + '/views/iniciosesion.html') //res.render("register", { errors, nombre, email, password });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      // Validación completa
      pool.query(
        `SELECT * FROM worker
          WHERE email_worker = $1
          AND cc_worker = $2
          AND phone_worker = $3
          AND picture_worker = $4`,
        [email, cedula, celular, foto],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            // aqui la vista
            return res.sendFile(__dirname + '/views/iniciosesion.html')
            // return res.render("register", {
            //   message: "Email already registered"
            // });
          } else {
            pool.query(
              `INSERT INTO worker (names_worker, lastnames_worker, address_worker, phone_worker, cc_worker, picture_worker, email_worker, password_worker)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                  RETURNING id_worker, password_worker`,
              [nombre, apellido, direccion, celular, cedula, email, hashedPassword],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                //req.flash("success_msg", "You are now registered. Please log in");
                res.redirect("/login");
              }
            );
          }
        }
      );
    }
};

module.exports = {
  signupWorker
}