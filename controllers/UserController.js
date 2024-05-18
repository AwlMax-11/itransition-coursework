import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { sequelize, User } from '../models/index.js'; 


export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        };
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const currentDate = new Date(); 
    
        const doc = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            lastLoginDate: currentDate,
            status: 0 
        });
    
        const user = await doc.save();

        const token = jwt.sign(
            {
                id: user.id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { password: passwordHash, ...userData } = user.toJSON();

        res.json({
            ...userData,
            token,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться!',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден.'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.password);

        if (!isValidPass) {
            return res.status(401).json({
                message: 'Неверный логин или пароль.'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { password, ...userData } = user.toJSON();

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Ошибка при авторизации.',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        const { password: passwordHash, ...userData } = user.toJSON();

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};