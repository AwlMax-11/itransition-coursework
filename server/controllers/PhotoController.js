import db from '../models/index.js';
const { Photo, User } = db;

export const getAll = async (req, res) => {
    try {
        const photos = await Photo.findAll({
            include: [
                    {
                        model: User, 
                        as: 'users',
                        attributes: ['id', 'username', 'email']
                    }
                ]
            });

        res.json(photos);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const photoId = req.params.id;
        
        const photos = await Photo.findOne(
            {
                where: { id: photoId },
            }
        );

        if (!photos) {
            return res.status(404).json({
                message: 'Статья не найдена'
            })
        }

        res.json(photos);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const photoId = req.params.id;

        const result = await Photo.destroy({
            where: { id: photoId }
        });

        if (result === 0) {
            return res.status(404).json({
                message: 'Статья не найдена'
            });
        }

        res.json({
            message: 'Статья удалена'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить статью'
        });
    }
};

export const create = async (req, res) => {
    try {
        const image = req.file ? req.file.buffer : null; 

        const photos = await Photo.create({
            userId: req.userId,
            title: req.body.title,
            text: req.body.text,
            category: req.body.category,
            image: image
        });


        res.json(photos);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}

export const update = async (req, res) => {
    try {
        const photoId = req.params.id;
        const image = req.file ? req.file.buffer : null; 

        const currentPhoto = await Photo.findOne({ where: { id: photoId } });
        const currentImage = currentPhoto.image;

        const updatedImage = image ? image : currentImage;

        const result = await Photo.update(
        {
            title: req.body.title,
            text: req.body.text,
            category: req.body.category,
            image: updatedImage
        },
        {
            where: { id: photoId }
        },
    );

    if (result[0] === 0) {
        return res.status(404).json({
            message: 'Статья не найдена'
        });
    }

    res.json({
        message: 'Статья обновлена'
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        });
    }
};