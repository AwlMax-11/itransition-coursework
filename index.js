import express from 'express';
import multer from 'multer';
import { UserController, PhotoController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js'
import { registerValidation } from './validations/register.js';
import { loginValidation } from './validations/login.js';
import { photoValidation } from './validations/photo.js';

const app = express();

app.use(express.json());

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me',  checkAuth, UserController.getMe);

app.get('/photos', photoValidation, PhotoController.getAll);
app.get('/photos/:id', photoValidation, PhotoController.getOne);
app.post('/photos', checkAuth, upload.single('image'), photoValidation, handleValidationErrors,PhotoController.create);
app.delete('/photos/:id', checkAuth, photoValidation, PhotoController.remove);
app.patch('/photos/:id', checkAuth, handleValidationErrors, PhotoController.update);

app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
