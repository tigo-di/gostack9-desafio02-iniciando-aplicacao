import { Router } from 'express';

const routes = new Router();

// testing...
routes.get('/users', (req, res) => {
  return res.status(200).json({ message: 'all users here' });
});

export default routes;
