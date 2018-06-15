import express from 'express';
import {Request, Response, NextFunction} from 'express';
import * as reimbursementService from '../services/reimbursement-service';
import { authMiddleware } from '../security/auth-middleware'; 
export const userRouter = express.Router();

userRouter.post('/login', (req, resp, next) => {

  console.log('Reached login post')
const user = req.body && req.body;
console.log(user);

      
  reimbursementService.userExists(req.body.username)
      .then(data => {
          // console.log(data)
          let targetUser = data.Items[0];
          // console.log(targetUser);
          if (targetUser.password === req.body.password) {
              console.log(`Login Is Successful`)
              // console.log(targetUser.username)
              req.session.role = targetUser.role;
              req.session.username = targetUser.username;
              // console.log(req.session.username)
              // console.log(req.session.role)
              resp.json({
                  username: targetUser.username,
                  role: req.session.role
              });
          } else {
              console.log(`Login Is Invalid`)
              resp.sendStatus(401);
          }
      }).catch(err => {
          console.log(err);
          resp.sendStatus(500);
      })
    });
/**
 * This will reset the session so that all session data is removed and a new session id will be created
 */
userRouter.delete('/logout', (req, resp, next) => {
  req.session.regenerate(err => {
    if (err) {
      resp.sendStatus(500);
    } else {
      resp.end();
    }
  });
});