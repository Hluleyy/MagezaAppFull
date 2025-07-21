
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Register user
app.post('/register', (req, res) => {
    const user = req.body;
    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
        users = JSON.parse(fs.readFileSync(filePath));
    }

    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({ message: "User registered successfully", user });
});

// Get users
app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    if (fs.existsSync(filePath)) {
        const users = JSON.parse(fs.readFileSync(filePath));
        res.json(users);
    } else {
        res.json([]);
    }
});

// Delete user by name
app.delete('/users/:name', (req, res) => {
    const { name } = req.params;
    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
        users = JSON.parse(fs.readFileSync(filePath));
    }

    const newUsers = users.filter(u => u.name !== name);
    fs.writeFileSync(filePath, JSON.stringify(newUsers, null, 2));

    res.json({ message: `${name} removed` });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
