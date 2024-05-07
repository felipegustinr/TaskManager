const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Se utiliza para comparar las contraseñas

const User = require('../models').user_model; // Importa el modelo de usuario

// Función para generar un token JWT
function generateToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        password:user.password
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Busca el usuario por su email en la base de datos
            const user = await User.findOne({ where: { email } });

            // Si el usuario no existe, devuelve un error
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
            const passwordMatch = await bcrypt.compare(password, user.password);

            // Si las contraseñas no coinciden, devuelve un error
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Si el usuario y la contraseña son correctos, genera un token JWT
            const token = generateToken(user);

            // Devuelve el token JWT como respuesta
            return res.status(200).json({ token });
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
