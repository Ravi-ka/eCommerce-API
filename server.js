// 1. Import Exprerss
import express from 'express';
import swagger from 'swagger-ui-express'
import cors from 'cors';

import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import apiDocs from './swagger.json' assert {type: 'json'}

// 2. Create Server
const server = express();

// CORS policy configuration
const corsOptions ={
  origin: 'http://localhost:5500',
}
server.use(cors(corsOptions));

/* Below is code without the npm cors package
server.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin','http://localhost:5500')
  res.header('Access-Control-Allow-Headers','*')
  res.header('Access-Control-Allow-Methods','*')

  // return OK status for preflight request
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200)
  }
  next();
})
*/

server.use(express.json());
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs))
//  Bearer <token> : In some type of applications we will use this 'Bearer Token'. use the format while appending to the Authorization token in the header.

// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use('/api/products', jwtAuth, productRouter);
server.use('/api/users', userRouter);
server.use('/api/cartItems',jwtAuth,cartRouter)

// 3. Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

//  4. Middleware to handle 404 requests. This 404 request should be implemented at the end.
server.use((req, res)=>{
  res.status(404).json({status:` ${req.url}  - API path is not available.`,message:'Please visit localhost:3200/api-docs for more information'})
})

// 5. Specify port.
server.listen(3200);

console.log('Server is running at 3200');
