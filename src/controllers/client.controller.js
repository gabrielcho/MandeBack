

const signupClient = async (req, res) => {
    // hace referencia a los id en los módulos HTML
    let { nombre, apellido, direccion, celular, cedula, email, password } = req.body;
  
    let errors = [];
  
    console.log({
      nombre,
      apellido,
      direccion,
      celular,
      cedula,
      email,
      password
      
    });
  
    if (!nombre || !apellido || !direccion || !celular || !cedula || !email || !password) {
      errors.push({ message: "Por favor complete todos los campos" });
    }
  
    if (password.length < 4) {
      errors.push({ message: "La contraseña debe ser de almenos 4 caracteres" });
    }
  
    if (errors.length > 0) {
        res.sendFile(__dirname + '/views/iniciosesion.html') //res.render("register", { errors, nombre, email, password });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      // Validación completa
      pool.query(
        `SELECT * FROM client
          WHERE email_client = $1
          AND cc_client = $2
          AND phone_client = $3`,
        [email, cedula, celular],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            return res.sendFile(__dirname + '/views/iniciosesion.html')
            // return res.render("register", {
            //   message: "Email already registered"
            // });
          } else {
            pool.query(
              `INSERT INTO client (names_client, lastnames_client, address_client, phone_client, cc_client, email_client, password_client)
                  VALUES ($1, $2, $3, $4, $5, $6, $7)
                  RETURNING id_client, password_client`,
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
  signupClient
}