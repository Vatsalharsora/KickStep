const express = require('express');
const app = express();

app.use(express.json());

// Simple DELETE route test
app.delete('/api/users/:id', (req, res) => {
    console.log('DELETE route hit with ID:', req.params.id);
    res.json({ 
        message: 'DELETE route working', 
        id: req.params.id 
    });
});

app.listen(3004, () => {
    console.log('Test server running on port 3004');
});