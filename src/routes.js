import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

// testing...
/* routes.get('/users', (req, res) => {
  return res.status(200).json({ message: 'all users here' });
});
*/

routes.post('/sessions', SessionController.store);
routes.post('/students', StudentController.store);

export default routes;
