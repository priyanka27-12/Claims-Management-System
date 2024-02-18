const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nicky123@#$',
    database: 'claimsys'
});

// app.get('/',  (req, res)=> {
//     const sql = "SELECT * FROM student";
//     db.query(sql, (err,result)=> {
//        if (err) return res.json({Message:"error"});
//        return res.json(result);
//     })
// })

// app.post('/student',  (req, res)=> {
//    const sql = "INSERT INTO user(name, email) VALUES (?)";
//    const values = [
//        req.body.name,
//        req.body.email
//    ]
//    db.query(sql,[values], (err,result)=> {
//        if (err) return res.json({Message:"error"});
//        return res.json(result);
//     })
// })

app.post('/signup', (req, res) => {
    const { username,  password,dob } = req.body;

    // Insert user into database with actual password
    const sql = "INSERT INTO user (username,password,dob) VALUES (?, ?, ?)";
    const values = [username, password,dob];
    
    db.query(sql, values, (dbErr, result) => {
        if (dbErr) {
            console.error('Error inserting user into database:', dbErr);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('User inserted successfully');
        return res.status(201).json({ message: 'User signed up successfully' });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE username=? AND password=?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) { 
            return res.json("error");
        }
        return res.json(data);
    })
})

app.get("/home", (req,res) => {
   
    const sql ="SELECT * FROM policy";
    db.query(sql, (err, data)=> {
     if(err) return res.json("Error")
     return res.json(data);
    })
 
     // res.json("Hello from backend")
 })

// Endpoint to get a single policy
app.get('/policy/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM policy WHERE PolicyID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Endpoint to submit a claim
app.post('/claims', (req, res) => {
    const { policyId, claimAmount, reason } = req.body;
    const sql = 'INSERT INTO claims (PolicyID, ClaimAmount, Reason) VALUES (?, ?, ?)';
    db.query(sql, [policyId, claimAmount, reason], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Claim submitted successfully', claimId: result.insertId });
    });
});

app.get("/claim-info", (req,res) => {
   
    const sql ="SELECT * FROM claims";
    db.query(sql, (err, data)=> {
     if(err) return res.json("Error")
     return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});