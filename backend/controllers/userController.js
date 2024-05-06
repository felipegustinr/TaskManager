const user = require('../models').user_model;
const rol = require('../models').rol_model;
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
        return user
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                rol_id: req.body.rol_id
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return user
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'user Not Found',
                    });
                }
                return user
                    .update({
                        name: req.body.name || user.name,
                        email: req.body.email || user.email,
                        password: req.body.password || user.password,
                        rol_id: req.body.rol_id || user.rol_id
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
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