const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'jayesh',
  database: 'ticketDB',
});
app.use(express.json());
app.use(cors());

// Define an API endpoint to create a request
// Define an API endpoint to create a request
app.post('/api/requests', (req, res) => {
  const {ticketNum,userId, reqBy, emailId,reqType, description, reqCategory, phoneNo,status, subject } = req.body;

  // Perform validation if necessary

  // Execute the MySQL query
  const query = `INSERT INTO issueTB (ticketNum, empId, reqBy, emailId, reqType, description, reqCategory, dateTimeTicket, phoneNo, status, subject) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, now(), ?, ?, ?)`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Error submitting request' });
      return;
    }

    connection.query(query, [ticketNum,userId, reqBy, emailId, reqType, description, reqCategory, phoneNo, status, subject], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Error submitting request' });
        return;
      }

      res.json({ message: 'Request submitted successfully' });
    });
  });
});

app.post('/api/editrequests', (req, res) => {
  const {emailId, reqType, description, reqCategory, phoneNo,ticketNum } = req.body;
  // Perform validation if necessary

  // Execute the MySQL query
  const query = `UPDATE issueTB SET emailId= ?, reqType= ?, description= ?, reqCategory= ?, dateTimeTicket= NOW(), phoneNo= ? 
                 WHERE ticketNum= ?`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Error submitting request' });
      return;
    }

    connection.query(query, [emailId, reqType, description, reqCategory, phoneNo, ticketNum], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Error submitting request' });
        return;
      }

      res.json({ message: 'Request submitted successfully' });
    });
  });
});

// //fetching ticket status
// // Define an API endpoint to fetch ticket status
// app.post('/api/fetch', (req, res) => {
//   const { ticketNum } = req.body;

//   // Execute the MySQL query
//   const query = `SELECT * FROM issueTB WHERE ticketNum = ?`;

//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to MySQL database:', err);
//       res.status(500).json({ error: 'Error fetching ticket status' });
//       return;
//     }

//     connection.query(query, [ticketNum], (err, result) => {
//       connection.release(); // Release the connection back to the pool

//       if (err) {
//         console.error('Error executing MySQL query:', err);
//         res.status(500).json({ error: 'Error in sql' });
//         return;
//       }

//       res.json({ data: result });
//     });
//   });
// });

app.post('/api/fetchall', (req,res)=>{
  const {userId} = req.body;
  const stat1="Active";
  const stat2="Pending";
  console.log("Res id:");
  console.log(userId);
  const query = 'SELECT * FROM issueTB WHERE emailId = ?  AND status=? OR status=? ORDER BY resolvedTime DESC;' ;
  pool.getConnection((err, connection) =>{
    if(err){
      console.log("Error connecting to db");
      res.status(500).json({error: 'Error connecting to DB'});
      return;
    }

    connection.query(query, [userId,stat1,stat2], (err,result) => {
      connection.release();

      if(err)
      {
        console.log("error in executing sql query");
        res.status(500).json({error: 'Error in executing query'});
        return;
      }
      console.log ("Server sending result:");
      console.log(result);
      res.json({data:result});
    })
  })
})

app.post('/api/fetch', (req,res)=>{
  const {userId} = req.body;
  console.log("Res id:");
  console.log(userId);
  stat="Pending"
  const query = 'SELECT * FROM issueTB WHERE emailId = ? AND status!=? ;' ;
  pool.getConnection((err, connection) =>{
    if(err){
      console.log("Error connecting to db");
      res.status(500).json({error: 'Error connecting to DB'});
      return;
    }

    connection.query(query, [userId,stat], (err,result) => {
      connection.release();

      if(err)
      {
        console.log("error in executing sql query");
        res.status(500).json({error: 'Error in executing query'});
        return;
      }
      console.log ("Server sending result:");
      console.log(result);
      res.json({data:result});
    })
  })
})

app.post('/api/members', (req, res) => {

  // Execute the MySQL query
  const query = `SELECT * FROM issueTB `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Error fetching ticket status' });
      return;
    }

    connection.query(query, [], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Error in sql' });
        return;
      }

      res.json({ data: result });
    });
  });
});

app.post('/api/pending', (req, res) => {

  // Execute the MySQL query
  const query = `SELECT * FROM issueTB WHERE Status='Pending' `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Error fetching ticket status' });
      return;
    }

     connection.query(query, [], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Error in sql' });
        return;
      }

      res.json({ data: result });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log("in login endpoint");
  // Execute the MySQL query
  const query = 'SELECT * FROM login WHERE email = ? AND password = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('Error connecting to MySQL database:');
      res.status(500).json({ success: false });
      return;
    }

    connection.query(query, [email, password], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.log('Error executing Login query:', error);
        res.status(500).json({ success: false });
        return;
      }

      if (results.length > 0) {
        const userRole = results[0].role; // Assuming 'role' is the column name for user roles

        // Based on the user's role, send the appropriate response
        if (userRole === 1) {
          res.json({ success: true, role: 'admin' });
        } 
        else if (userRole === 2) {
          res.json({ success: true, role: 'developer' });
        } 
        else if (userRole === 0) {
          res.json({ success: true, role: 'user' }); 
        }
      } else {
        res.json({ success: false });
      }
    });
  });
});

app.post('/api/resolver', (req,res)=>{
  const {resId} = req.body;
  console.log("Res id:");
  console.log(resId);
  const status="Active";
  const query = 'SELECT * FROM issueTB WHERE assignTo = ? AND status= ?;' ;
  pool.getConnection((err, connection) =>{
    if(err){
      console.log("Error connecting to db");
      res.status(500).json({error: 'Error connecting to DB'});
      return;
    }

    connection.query(query, [resId,status], (err,result) => {
      connection.release();

      if(err)
      {
        console.log("error in executing sql query");
        res.status(500).json({error: 'Error in executing query'});
        return;
      }
      console.log ("Server sending result:");
      console.log(result);
      res.json({data:result});
    })
  })
})

app.post('/api/resolverviewall', (req,res)=>{
  const {resId} = req.body;
  console.log("Res id:");
  console.log(resId);
  const query = 'SELECT * FROM issueTB WHERE assignTo = ?;' ;
  pool.getConnection((err, connection) =>{
    if(err){
      console.log("Error connecting to db");
      res.status(500).json({error: 'Error connecting to DB'});
      return;
    }

    connection.query(query, [resId], (err,result) => {
      connection.release();

      if(err)
      {
        console.log("error in executing sql query");
        res.status(500).json({error: 'Error in executing query'});
        return;
      }
      console.log ("Server sending result:");
      console.log(result);
      res.json({data:result});
    })
  })
})

app.post('/api/resolvedata', (req,res)=>{
  const {ticketNum} = req.body;

  const query = 'SELECT * FROM issueTB WHERE ticketNum = ?;' ;
  pool.getConnection((err, connection) =>{
    if(err){
      console.log("Error connecting to db");
      res.status(500).json({error: 'Error connecting to DB'});
      return;
    }

    connection.query(query, [ticketNum], (err,result) => {
      connection.release();

      if(err)
      {
        console.log("error in executing sql query");
        res.status(500).json({error: 'Error in executing query'});
        return;
      }

      res.json({data:result});
    })
  })
})

// API endpoint for fetching ticket details
app.get('/api/tickets/:ticketNum', (req, res) => {
  const { ticketNum } = req.params;

  // Execute the MySQL query to fetch ticket details based on ticketNum
  const query = `SELECT * FROM issuetb WHERE ticketNum = '${ticketNum}'`;

  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Error fetching ticket details' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const ticketDetails = result[0]; // Assuming only one ticket is returned

    res.json(ticketDetails);
  });
});

// API endpoint to fetch options based on resLevel
app.get('/api/options', (req, res) => {
  const level = req.query.level; // Get the level from the query parameter

  // Query the database to fetch options based on the resLevel
  const query = `SELECT resName FROM resolver WHERE resLevel = ?`;
  pool.query(query, [level], (error, results) => {
    if (error) {
      console.error('Error fetching options:', error);
      res.status(500).json({ error: 'Failed to fetch options' });
    } else {
      const options = results.map((row) => row.resName);
      res.json({ options });
    }
  });
});

// Update the 'assignto' column in the issuetb table
app.post('/api/update-issue', (req, res) => {
  const { ticketNum, status, assignto } = req.body;

  // Fetch the employee ID based on the selected employee name (assignto)
  const query = 'SELECT resId FROM resolver WHERE resName = ?';
  pool.query(query, [assignto], (error, results) => {
    if (error) {
      console.error('Error fetching employee ID:', error);
      res.status(500).json({ error: 'Failed to fetch employee ID' });
    } else {
      if (results.length === 0) {
        // If the employee ID is not found, respond with an error
        res.status(404).json({ error: 'Employee not found' });
      } else {
        // If the employee ID is found, update the 'assignto' column in the issuetb table
        const employeeId = results[0].resId;
        const updateQuery = 'UPDATE issuetb SET assignTo = ? ,status= ? WHERE ticketNum = ?';
        pool.query(updateQuery, [employeeId, status, ticketNum], (error, updateResults) => {
          if (error) {
            console.error('Error updating issue:', error);
            res.status(500).json({ error: 'Failed to update issue' });
          } else {
            console.log('Issue updated successfully');
            res.status(200).json({ message: 'Issue updated successfully' });
          }
        });
      }
    }
  });
});

app.post('/api/userdata', (req,res) => {
  const {userMail} = req.body;
  const query = 'SELECT * FROM usertb WHERE userEmail = ?' ;
  pool.query(query, [userMail], (error, results) => {
    if(error)
    {
      console.log("error in fetching user data at server for context");
      res.status(500).json({error : "failed to fetch data"});
    }
    else {
    console.log("data fetched at server for context");
    console.log(results);
    res.json({data:results});
  }
  })
})

app.post('/api/admindata', (req,res) => {
  const {userMail} = req.body;
  const query = 'SELECT * FROM admintb WHERE adminEmail = ?' ;
  pool.query(query, [userMail], (error, results) => {
    if(error)
    {
      console.log("error in fetching user data at server for context");
      res.status(500).json({error : "failed to fetch data"});
    }
    else {
    console.log("data fetched at server for context");
    console.log(results);
    res.json({data:results});
  }
  })
})

app.post('/api/resolverdata', (req,res) => {
  const {userMail} = req.body;
  console.log("email in server.js :");
  console.log(userMail);
  const query = 'SELECT * FROM resolver WHERE resEmail = ?' ;
  pool.query(query, [userMail], (error, results) => {
    if(error)
    {
      console.log("error in fetching user data at server for context");
      res.status(500).json({error : "failed to fetch data"});
    }
    else {
    console.log("data fetched at server for context");
    console.log(results);
    res.json({data:results});
  }
  })
})

app.post('/api/delete', (req,res)=>{
  const {ticketNum,status} = req.body;
  console.log(ticketNum);
  console.log("delete");

  const query = 'UPDATE issuetb SET status= ?, resolvedTime=NOW() WHERE ticketNum=?' ;
  const updateQuery='SELECT * FROM issuetb WHERE ticketNum=?';
  pool.getConnection((err, connection) =>{
    if(err){
      console.log("Error connecting to db");
      res.status(500).json({error: 'Error connecting to DB'});
      return;
    }

      connection.query(query, [status,ticketNum], (err,result) => {
      connection.release();
      if(err)
      {
        console.log("error in executing sql query");
        res.status(500).json({error: 'Error in executing query'});
        return;
      }

      res.json({data:result});
    })
  })
})


//update status to done by resolver
app.post('/api/updateStatus', (req,res)=>{
  const {ticketNum,status} = req.body;

  // const query = 'SELECT * FROM issueTB WHERE ticketNum = ?;' ;
  const query = 'UPDATE issuetb SET status= ?, resolvedTime= NOW() WHERE ticketNum = ?;' ;
  pool.getConnection((err, connection) =>{
    if(err){
      console.log("Error connecting to db");
      res.status(500).json({error: 'Error connecting to DB'});
      return;
    }

    connection.query(query, [status,ticketNum], (err,result) => {
      connection.release();

      if(err)
      {
        console.log("error in executing sql query");
        res.status(500).json({error: 'Error in executing query'});
        return;
      }

      res.json({data:result});
    })
  })
})
app.post('/api/reset_password', (req, res) => {
  const { email, password } = req.body;
  console.log("in reset password endpoint");

  // You should add validation checks for email and password here

  // Execute the MySQL query to update the password
  const query = 'UPDATE login SET password = ? WHERE email = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('Error connecting to MySQL database:');
      res.status(500).json({ success: false });
      return;
    }

    connection.query(query, [password, email], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.log('Error executing Reset Password query:', error);
        res.status(500).json({ success: false });
        return;
      }

      if (results.affectedRows > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});