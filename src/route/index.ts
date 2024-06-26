import express from 'express';

let router = express.Router();

router.use('/user', userRouter);

export default router;