import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';
import { Sequelize, DataTypes } from 'sequelize';
import { sequelize, User } from './models/index.js'; 

// User.sync().then(() => {
//     console.log('User table created');
// });

// sequelize.sync({ force: false }).then(() => {
//     console.log('User table is up to date');
// }).catch(err => {
//     console.error('Unable to sync database:', err);
// });

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => { 
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const saul = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saul);
    const currentDate = new Date(); 

    const doc = new User({
        email: req.body.email,
        username: req.body.username,
        password: passwordHash,
        lastLoginDate: currentDate,
        status: 0 
    });

    const user = await doc.save();
    res.json(user);
});

app.listen(4444, (err) => {
    if(err) {
        return console.log(err)
    }

    console.log('Server OK')
});
