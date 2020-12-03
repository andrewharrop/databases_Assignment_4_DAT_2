const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;
//mysql password: root, username:root
app.use(bodyparser.json());
app.use(cors())

app.use(bodyparser.urlencoded({ extended: true }));
// app.use("/", express.static('static/login'));
// app.use("/home", express.static('static/home'));
// app.use("/register", express.static('static/register'))
// app.use((req, res, next) => {
//     console.log(`${req.method} request for ${req.url}`);
//     next();
//})

let storedUser = "";

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


app.get('/loggedIn', (req, res) => {
    res.json({ status: loggedIn });
})
app.post('/register', (req, res) => {
    firstname = req.body.firstname;
    lastname = req.body.lastname;
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    found = false;
    connection.query("SELECT * FROM userinfo", function(err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            if (result[i].username == username || result[i].email == email) {
                found = true
            }
        }
    })
    if (!found) {
        connection.query("INSERT INTO userinfo (username, firstname, lastname,userpw,useremail) VALUES ('" + username + "'" + ",'" + firstname + "','" + lastname + "','" + password + "', '" + email + "')",
            function(err, result) {
                //if (err) console.log(err)
                console.log("Success");
            })
    } else {
        //user already exists logic
    }
    //console.log(loggedIn)

})
app.post('/logout', (req, res) => {
    loggedIn = false;
})
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password
    let loggedIn = false;
    connection.query("SELECT * FROM userinfo", function(err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            if (result[i].username == username && result[i].userpw == password) {
                // res.json({ status: true });
                // res.end()
                loggedIn = true;
                storedUser = username;
            }

        }
        console.log(loggedIn)
        res.json({ status: loggedIn })
    })

})

app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
})