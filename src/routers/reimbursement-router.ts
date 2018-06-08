import express from 'express';
import { authMiddleware } from '../security/auth-middleware'; 
import * as reimbursementService from '../services/reimbursement-service';
import {Request, Response, NextFunction} from 'express';

export const reimbursementRouter = express.Router();

/****************************************************************
 * Router for finding all users by status (works)
 ****************************************************************/
reimbursementRouter.get('/status/:status', [
    // authMiddleware('admin'),
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
reimbursementRouter.get('/name/:name', (req: Request, resp: Response) => {
   const name = req.params.name;
   (req, resp) => {

   }
});

// reimbursementRouter.post('', [
//   (req, resp) => {
//     console.log(req.body);
//     reimbursementService.save(req.body)
//     .then(data => {
//       resp.json(data.Item);
//     })
//     .catch(err => {
//       console.log(err);
//       resp.sendStatus(500);
//     });
// }]);


/********************************************
 * Router for posting reimbursement requests
 ********************************************/
reimbursementRouter.post('', [
  (req,resp) => {
    console.log(req.body);
    reimbursementService.saveRequest(req.body)
    .then(data => {
      resp.json(data);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    })
  }
]);