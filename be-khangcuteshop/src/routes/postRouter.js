import express from 'express';
import postController from '../controllers/PostController';


const router = express.Router();

router.post('/create-post/:id', postController.createPost)

export default router