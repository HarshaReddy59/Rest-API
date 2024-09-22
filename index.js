const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const atob = require('atob');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// GET route to return operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST route for data processing
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "Harsha12";  // Static user_id (you can make this dynamic)
    const email = "harsha_punuru@srmap.edu.in";
    const roll_number = "AP21110010050";

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

    // File Handling
    let file_valid = false;
    let file_mime_type = null;
    let file_size_kb = null;

    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, 'base64');
            file_valid = true;
            file_size_kb = (fileBuffer.length / 1024).toFixed(2);  // File size in KB
            file_mime_type = "application/octet-stream";  // Example MIME type (can be more specific)
        } catch (error) {
            file_valid = false;
        }
    }

    // Response
    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
