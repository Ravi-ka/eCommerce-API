import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from './user.model.js';
import UserRepository from './user.repository.js';

export default class UserController {
  constructor(){
    this.userRepository = new UserRepository();
  }
   async signUp(req, res) {
    try {
          const {
          name,
          email,
          password,
          type,
        } = req.body;

        // Hashing the user password using 'bcrypt' library
        const hashedPassword =await bcrypt.hash(password,12)
        const user = new UserModel(
          name,
          email,
          hashedPassword,
          type
        );
        await this.userRepository.signUp(user);
        res.status(201).send(user);
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500)
    }
    
  }

  async signIn(req, res) {
    try {
        // 1. FInd user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if(!user){
        return res
            .status(400)
            .send('Incorrect Credentials');
      }
      else{
        // 2. Compare the password with hashed password
        const result = await bcrypt.compare(req.body.password,user.password)
        if(result){
              // 1. Create token.
          const token = jwt.sign(
            {
              userID: result.id,
              email: result.email,
            },
            'Q2QQLf7zZzdY5BXPSDglSSyjscbdFGeq',
            {
              expiresIn: '1h',
            }
          );
          // 2. Send token.
          return res.status(200).send(token);
        }
          else{
          return res
            .status(400)
            .send('Incorrect Credentials');
        }
      }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
    
  }
}
