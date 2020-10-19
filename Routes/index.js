import express from 'express';
import workRoutes from './works';
import adminRoutes from './admin';

const router = express.Router();

export default () => {
  router.get('/', (req, res) => {
    res.render('index', { title: 'homepage' });
  });

  router.use('/works', workRoutes());
  router.use('/admin', adminRoutes());
  return router;
};
