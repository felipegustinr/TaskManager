const task = require('../models').task_model;
const task_list = require('../models').task_list_model;
module.exports = {
    list(req, res) {
        return task
            .findAll({})
            .then((task) => res.status(200).send(task))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        console.log(req.params.id);
        return task
            .findByPk(req.params.id)
            .then((task) => {
                console.log(task);
                if (!task) {
                    return res.status(404).send({
                        message: 'task Not Found',
                    });
                }
                return res.status(200).send(task);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        return task
            .create({
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed,
                create_at: req.body.create_at,
                list_id: req.body.list_id
            })
            .then((task) => res.status(201).send(task))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return task
            .findByPk(req.params.id)
            .then(task => {
                if (!task) {
                    return res.status(404).send({
                        message: 'task Not Found',
                    });
                }
                return task
                    .update({
                        title: req.body.title || task.title,
                        description: req.body.description || task.description,
                        completed: req.body.completed || task.completed,
                        create_at: req.body.create_at || task.create_at,
                        list_id: req.body.list_id || task.list_id
                    })
                    .then(() => res.status(200).send(task))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return task
            .findByPk(req.params.id)
            .then(task => {
                if (!task) {
                    return res.status(400).send({
                        message: 'task Not Found',
                    });
                }
                return task
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    listFull(req, res) {
        return task
            .findAll({
                include: [{
                    model: task_list
                }]
            })
            .then((task) => res.status(200).send(task))
            .catch((error) => { res.status(400).send(error); });
    },
};