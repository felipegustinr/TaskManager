const task_list = require('../models').task_list_model;
const user = require('../models').user_model;
module.exports = {
    list(req, res) {
        return task_list
            .findAll({})
            .then((task_list) => res.status(200).send(task_list))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        console.log(req.params.id);
        return task_list
            .findByPk(req.params.id)
            .then((task_list) => {
                console.log(task_list);
                if (!task_list) {
                    return res.status(404).send({
                        message: 'task_list Not Found',
                    });
                }
                return res.status(200).send(task_list);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        return task_list
            .create({
                title: req.body.title,
                user_id: req.body.user_id,
                create_at: req.body.create_at,
            })
            .then((task_list) => res.status(201).send(task_list))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return task_list
            .findByPk(req.params.id)
            .then(task_list => {
                if (!task_list) {
                    return res.status(404).send({
                        message: 'task_list Not Found',
                    });
                }
                return task_list
                    .update({
                        title: req.body.title || task.title,
                        user_id: req.body.user_id || task.user_id,
                        create_at: req.body.create_at || task.create_at,

                    })
                    .then(() => res.status(200).send(task_list))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return task_list
            .findByPk(req.params.id)
            .then(task_list => {
                if (!task_list) {
                    return res.status(400).send({
                        message: 'task_list Not Found',
                    });
                }
                return task_list
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    listFull(req, res) {
        return task_list
            .findAll({
                include: [{
                    model: user
                }]
            })
            .then((task_list) => res.status(200).send(task_list))
            .catch((error) => { res.status(400).send(error); });
    },

};