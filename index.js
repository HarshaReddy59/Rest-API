const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// POST route to handle incoming requests
app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;
        const user_id = "Harsha12";  // Placeholder for user ID

        // Validate incoming data
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid data format" });
        }

        // Separate numbers and alphabets from the input array
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));

        // Get the highest lowercase alphabet (if exists)
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
            ? [Math.max(...lowercaseAlphabets)]
            : [];

        // Handle file logic if base64 is provided
        let file_valid = false, file_mime_type = null, file_size_kb = null;

        if (file_b64) {
            const buffer = Buffer.from(file_b64, 'base64');
            file_size_kb = (buffer.length / 1024).toFixed(2);  // Convert to KB
            file_valid = true;
            file_mime_type = "application/octet-stream";  // Default MIME type
        }

        // Construct the response
        const response = {
            is_success: true,
            user_id,
            email: "harsha_punuru@srmap.edu.in",
            roll_number: "AP21110010050",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet,
            file_valid,
            file_mime_type,
            file_size_kb
        };

        // Send the response
        res.json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

// GET route for operation code
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
