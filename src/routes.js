import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

const routes = new Router();

// testing...
routes.get('/users', (req, res) => {
  return res.status(200).json({ message: 'all users here' });
});

routes.post('/sessions', SessionController.store);

export default routes;
