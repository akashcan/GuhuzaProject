const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5501' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/api/quiz", async (req, res) => {
    const level = req.query.level || 1; 
    const apiUrl = `https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=${level}`;

    try {
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        res.json(data); 
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Failed to fetch data from API" });
    }
});

// Start the server
app.listen(3005, () => {
    console.log('Server running on port 3005');
});
