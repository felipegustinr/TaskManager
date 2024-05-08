const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models').user_model;

function generateToken(user) {
    const payload = {
        email: user.email,
        password: user.password
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
    login(req, res) {
        const { email, password } = req.body;

        // Busca el usuario por su email en la base de datos
        User.findOne({ where: { email } })
            .then(user => {
                // Si el usuario no existe, devuelve un error
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
                bcrypt.compare(password, user.password)
                    .then(passwordMatch => {
                        // Si las contraseñas no coinciden, devuelve un error
                        if (!passwordMatch) {
                            return res.status(401).json({ message: 'Invalid password' });
                        }

                        // Si el usuario y la contraseña son correctos, genera un token JWT
                        const token = generateToken(user);

                        // Devuelve el token JWT como respuesta
                        return res.status(200).json({ token });
                    })
                    .catch(error => {
                        console.error('Error comparing passwords:', error);
                        return res.status(500).json({ message: 'Internal server error' });
                    });
            })
            .catch(error => {
                console.error('Error finding user:', error);
                return res.status(500).json({ message: 'Internal server error' });
            });
    }
};
