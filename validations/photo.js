import { body } from "express-validator";

export const photoValidation = [
    body('title', 'Введите название').isLength({ min: 3 }).isString(),
    body('text', 'Введите описание').isLength({ min: 3 }).isString(),
    body('category', 'Выберите категорию').isIn(['Свадебное', 
                                                'Природа', 
                                                'Портретное', 
                                                'Природные и погодные явления', 
                                                'Животные',
                                                'Авто и мото',
                                                'Разное']),
    body('image', 'Загрузите изображение').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Изображение обязательно');
        }
        return true;
    }),
]; 