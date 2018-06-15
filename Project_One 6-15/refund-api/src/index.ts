import express from 'express';
import session from 'express-session';
import path from 'path';
import {Request, Response, NextFunction} from 'express';
import { userRouter } from './routers/user-router';
import { reimbursementRouter } from './routers/reimbursement-router';
import bodyParser from 'body-parser';

const app = express();

const port = 3001;
app.set('port', port);

const sess = {
    secret: 'keyboard cat',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
  };
  
  // set up express to attach sessions
  app.use(session(sess));

  // allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
    express.static(path.join(__dirname, 'static'))
  );

  // log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

/***
 * Log all requests url and method to the console
 */
app.use((req: Request, resp: Response, next: NextFunction) => {
    console.log(`request was made with url: ${req.path}
and method: ${req.method}`);
    next();
});

// Register the body parser
app.use(bodyParser.json());

// allow cross origins
app.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

/*************************************************************
 * Register Routers
 *************************************************************/
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

 app.listen(port, () => {
    console.log(` app is running at http://localhost:${app.get(`port`)}`);
});

