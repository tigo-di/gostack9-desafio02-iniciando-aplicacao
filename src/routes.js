import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// testing...
/* routes.get('/users', (req, res) => {
  return res.status(200).json({ message: 'all users here' });
});
*/

routes.post('/sessions', SessionController.store);
routes.post('/students', StudentController.store);

// global middleware
routes.use(authMiddleware);

routes.put('/students/:id', StudentController.update);

export default routes;
