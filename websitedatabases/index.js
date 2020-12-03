  const mysql = require('mysql');
  const express = require('express');
  const app = express();
  const port = 3000;
  //mysql password: root, username:root

  app.use("/", express.static('static/login'));
  app.use("/home", express.static('static/home'));
  app.use("/register", express.static('static/register'))
  app.use((req, res, next) => {
      console.log(`${req.method} request for ${req.url}`);
      next();
  })

  let loggedIn = false;

  var connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'mydb'
      })
      //   connection.connect(function(err) {
      //       if (err) console.log(err);
      //       else console.log('conencted')

  //   })
  //   connection.connect(function(err) {
  //       if (err) throw err;
  //       console.log("Query connected");
  //       connection.query("SELECT * FROM region", function(err, result) {
  //           for (let i = 0; i < result.length; i++) {
  //               console.log(result[i].province)
  //           }

  //       })

  //   })

  //https://codeshare.io/G7kLd1


  app.post('/logout', (req, res) => {
      loggedIn = false;
  })
  app.post('/login', (req, res) => {
              let username = req.body.username;
              let password = req.body.password
              connection.connect((err) => {
                  if (err) throw err;
                  console.log('Login good');
                  connection.query("SELECT * FROM userinfo", (err, result) => {
                      for (let i = 0; i < result.length; i++) {
                          if (result[i].username == username && result[i].password == password) {
                              res.json({ status: true });
                              loggedIn = true;
                          } else {
                              res.json({ status: false });
                          }
                      }

                  })
              })
              app.listen(port, () => {
                  console.log(`listening on port ${port} ...`);
              })