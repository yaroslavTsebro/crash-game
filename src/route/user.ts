import express from 'express';

let router = express.Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', authorizationMiddleware, userController.logout);
router.post('/profile', authorizationMiddleware, userController.getProfile);
router.get('/refresh', userController.refresh);

export {
  router as userRouter
}