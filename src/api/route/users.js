const express = require('express');
const AppFileUtil = require('../util/file.util');

const usersRouter = express.Router();

// /api/products
usersRouter.get('/', (req, res) => {
    const search = req.query.s;
    let result = null;
    const users = AppFileUtil.getData('users');
    if (search) {
        result = users.filter((st) => { return st.name.toLowerCase().startsWith(search.toLowerCase()) })
    }
    else {
        result = users;
    }

    res.send(result);
})

// /api/products/:id
usersRouter.get('/:id', (req, res) => {
    const studentID = req.params.id;
    const users = AppFileUtil.getData('users');
    let student = users.find((st) => { return st.id == studentID });
    if (!student) {
        res.status(404).send({ message: 'student not found' })
    }
    res.send(student);
})

// /api/products
usersRouter.post('/', (req, res) => {
    const student = req.body;
    const users = AppFileUtil.getData('users');
    users.push(student);
    AppFileUtil.writeData('users', users);
    res.send({ message: 'new student information saved!' })
})

// TODO: UPDATE A USER
// TODO: DELETE A USER

module.exports = usersRouter;