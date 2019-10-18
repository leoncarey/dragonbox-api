//Importo somnete a funcão router
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/users', UserController.list);

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

//Middleware para controle de autenticação
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
