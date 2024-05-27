import jwt from 'jsonwebtoken';
import { User, Photo } from '../models/index.js';

const checkAuth = async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (!token) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }

        const decoded = jwt.verify(token, 'secret123');

        req.userId = decoded.id;

        const user = await User.findByPk(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: 'Нет доступа',
        });
    }
};

export default checkAuth;



// import jwt from 'jsonwebtoken';

// export default (req, res, next) => {
//     const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

//     if (token) {
//         try {
//             const decoded = jwt.verify(token, 'secret123');

//             req.userId = decoded.id;
//             next();
//         } catch (err) {
//             return res.status(403).json({
//                 message: 'Нет доступа',
//             });
//         }
//     } else {
//         return res.status(403).json({
//             message: 'Нет доступа',
//         });
//     }
// };