// server.js
const express = require('express');
const sql = require('mssql');
const app = express();

// Setup for serving static HTML and parsing request bodies
app.use(express.static('public')); // assuming HTML file is in 'public' directory
app.use(express.json());

// SQL Server connection configuration
const config = {
    user: 'your-username',  // Your SQL Server username
    password: 'your-password', // Your SQL Server password
    server: 'your-server', // e.g., 'localhost' or '192.168.1.100'
    database: 'your-database', // Name of the database you want to connect to
    options: {
        encrypt: true, // Use encryption if needed
        trustServerCertificate: true // Disable SSL verification (optional)
    }
};

// Example route to get data from MS SQL
app.get('/get-data', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM your_table');
        res.json(result.recordset); // Send data back to the client
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Database error');
    }
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});