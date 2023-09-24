// 1. Import express.
import express from 'express';
import CartItemsController from './cartItems.controller.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';

// 2. Initialize Express router.
const cartRouter = express.Router();

// const productController = new ProductController();
const cartController = new CartItemsController();

cartRouter.post('/',cartController.add)
cartRouter.get('/',cartController.get)

export default cartRouter;