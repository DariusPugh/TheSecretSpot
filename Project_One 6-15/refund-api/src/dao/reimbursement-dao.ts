import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
import { stringType } from 'aws-sdk/clients/iam';
const awsConfig: ConfigurationOptions = {
  region: 'us-west-2' ,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

aws.config.update(awsConfig);

const dynamodb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient(); // subset of functionality of dynamodb

export function saveUser(user): Promise<any> {
    return docClient.put({
      TableName: 'User',
      Item: user
    }).promise();
  }

/*******************************************************************
 * Find all users by status
 *******************************************************************/
export function findAllByStatus(status: string): Promise<any> {
  return docClient.query({
    TableName: 'Reimbursment',
     IndexName: 'status-index',
     KeyConditionExpression: '#st = :stat',
     ExpressionAttributeNames: { // for aliasing field names
       '#st': 'status'
     },
     ExpressionAttributeValues: { // for aliasing actual values
       ':stat': status
     },
   }).promise();
}


/*******************************************************************
 * Display all Requests made by employee 
 *******************************************************************/
export function viewUserRequests(username: string): Promise<any> {
  return docClient.query({
      TableName: 'Reimbursment',
      KeyConditionExpression: '#un = :user',
      ExpressionAttributeNames: {
          '#un': 'username'
      },
      ExpressionAttributeValues: {
          ':user': username
      }
  }).promise();
}



/********************************************************************************
 * - Post a new reimbursement request to the table of reimbursement requests.
 ********************************************************************************/

export function saveRequest(username, reimbursement): Promise<any> {
let time = new Date()
  return docClient.put({
      TableName: 'Reimbursment',
      Item: {
          username: username,
          time_submitted: time.getTime(),
          approver: "admin",
          items: reimbursement,
          status: "pending",
          receipts: []
      }
  }).promise();
}

// saveRequest({
//     approver: "admin",
//     items:{
//         amount: 0,
//         description: '',
//         timeOfExpense: time,
//         title: ''
//     },
//     status: "pending",
//     username: req.session.username,
//     time_submitted: time,
// })
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })

/**************************************************************
 * To manage users
 **************************************************************/
export function userExists(username: string): Promise<any> {
  return docClient.query({
      TableName: 'User',
      KeyConditionExpression: '#un = :user',
      ExpressionAttributeNames: {
          '#un': 'username'
      },
      ExpressionAttributeValues: {
          ':user': username
      }
  }).promise();
}

/****************************************************************
 *  - Approve or deny selected requests (ADMIN)
 ****************************************************************/
export function applyAction(status: string, username, timeSubmitted): Promise<any> {
  return docClient.update({
      TableName: 'Reimbursment',
      Key: {
          username: username,
          time_submitted: timeSubmitted
      },
      UpdateExpression: 'set #stat = :targetStat',
      ExpressionAttributeNames: {
          '#stat': 'status',
      },
      ExpressionAttributeValues: {
          ':targetStat': status,
      }
  }).promise();
}
