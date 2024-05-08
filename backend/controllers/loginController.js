const jwt = require('jsonwebtoken');
const User = require('../models').user_model;

function generateToken(user) {
    const payload = {
        email: user.email,
        username: user.name,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
    login(req, res) {
        const { email, password } = req.body;

        User.findOne({ where: { email } })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                if (user.password !== password) {
                    return res.status(401).json({ message: 'Invalid password' });
                }

                const token = generateToken(user);

                return res.status(200).json({ token, username: user.name });
            })
            .catch(error => {
                console.error('Error finding user:', error);
                return res.status(500).json({ message: 'Internal server error' });
            });
    }
};
