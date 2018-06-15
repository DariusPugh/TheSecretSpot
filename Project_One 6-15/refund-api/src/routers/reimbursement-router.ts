import express from 'express';
import { authMiddleware } from '../security/auth-middleware'; 
import * as reimbursementService from '../services/reimbursement-service';
import {Request, Response, NextFunction} from 'express';

export const reimbursementRouter = express.Router();

/****************************************************************
 * Router for finding all users by status (works)
 ****************************************************************/
reimbursementRouter.get('/status/:status', [
    authMiddleware('admin'),
    (req, resp: Response, next) => {
      reimbursementService.findAllByStatus(req.params.status)
        .then(data => {
          resp.json(data.Items);
        })
        .catch(err => {
          console.log(err);
          resp.sendStatus(500);
        });
    }
  ]);
/*************************************************************************
 * Get Ticket Requests
 *************************************************************************/
reimbursementRouter.get('/username/', [
  authMiddleware('employee', 'admin'),
  (req: Request, resp: Response) => {
    console.log('got the reques');
      reimbursementService.viewUserRequests(req.session.username)
        .then(data => {
          console.log(data);
          resp.json(data.Items);
        })
        .catch(err => {
          console.log(err);
          resp.sendStatus(500);
        });
    }
]);


/********************************************
 * Router for posting reimbursement requests
 ********************************************/
reimbursementRouter.post('/', [
  authMiddleware('employee'),
  (req,resp) => {
    console.log(req.body);
    reimbursementService.saveRequest(req.session.username, req.body)
    .then(data => {
      resp.json(data);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    })
  }
]);

/***********************************************
 * Routers for approving or denying
 ***********************************************/

reimbursementRouter.post('/username/requests/approve',
authMiddleware('admin'), 
  (req:Request, resp:Response) => {
    console.log(req.body)
      reimbursementService.applyAction(req.body.status, req.body.username ,req.body.timeSubmitted)
          .then(data => {
            resp.json(data);
          })
          .catch(err => {
            console.log(err);
            resp.sendStatus(500);
          })
    }
);

