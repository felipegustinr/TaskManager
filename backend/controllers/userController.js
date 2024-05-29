const user = require('../models').user_model;
const rol = require('../models').rol_model;
const bcrypt = require('bcrypt');

const saltRounds = 10

module.exports = {
    list(req, res) {
        return user
            .findAll({})
            .then((user) => res.status(200).send(user))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        console.log(req.params.id);
        return user
            .findByPk(req.params.id)
            .then((user) => {
                console.log(user);
                if (!user) {
                    return res.status(404).send({
                        message: 'user Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        const { name, email, password, rol_id } = req.body;

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).send({ message: 'Error encrypting password', error: err });
            }

            return user
                .create({
                    name: name,
                    email: email,
                    password: hash,
                    rol_id: rol_id
                })
                .then((user) => res.status(201).send(user))
                .catch((error) => res.status(400).send(error));
        });
    },

    update(req, res) {
        return user
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }

                const { name, email, password, rol_id } = req.body;
                const updateUser = (hash) => {
                    return user
                        .update({
                            name: name || user.name,
                            email: email || user.email,
                            password: hash || user.password,
                            rol_id: rol_id || user.rol_id
                        })
                        .then(() => res.status(200).send(user))
                        .catch((error) => res.status(400).send(error));
                };

                if (password) {
                    // Si se proporciona una nueva contraseña, encriptarla
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if (err) {
                            return res.status(500).send({ message: 'Error encrypting password', error: err });
                        }
                        updateUser(hash);
                    });
                } else {
                    // Si no se proporciona una nueva contraseña, mantener la existente
                    updateUser(user.password);
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return user
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'user Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    listFull(req, res) {
        return user
            .findAll({
                include: [{
                    model: rol
                }]
            })
            .then((user) => res.status(200).send(user))
            .catch((error) => { res.status(400).send(error); });
    },
};