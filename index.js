import express from 'express';
//import { sequelize } from './models/index.js';
import multer from 'multer';
import { registerValidation } from './validations/register.js';
import { loginValidation } from './validations/login.js';
import { photoValidation } from './validations/photo.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PhotoController from './controllers/PhotoController.js';


const app = express();

app.use(express.json());

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me',  checkAuth, UserController.getMe);

app.get('/photos', photoValidation, PhotoController.getAll);
app.get('/photos/:id', photoValidation, PhotoController.getOne);
app.post('/photos', checkAuth, upload.single('image'), photoValidation, PhotoController.create);
app.delete('/photos/:id', checkAuth, photoValidation, PhotoController.remove);
app.put('/photos/:id', checkAuth, photoValidation, PhotoController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
