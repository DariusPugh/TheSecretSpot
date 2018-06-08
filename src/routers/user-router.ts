import express from 'express';
import {Request, Response, NextFunction} from 'express';
import * as reimbursementService from '../services/reimbursement-service';
import { authMiddleware } from '../security/auth-middleware'; 
export const userRouter = express.Router();

userRouter.post('', [
  // authMiddleware('admin'),
  (req, resp) => {
    console.log(req.body);
    reimbursementService.save(req.body)
    .then(data => {
      resp.json(data);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
}]);

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