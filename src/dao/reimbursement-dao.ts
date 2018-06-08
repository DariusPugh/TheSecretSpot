import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
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

/*******************************
 * Find all users by status
 *******************************/
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

// export function viewByUser(username: string): Promise<any> {
//   return docClient.query({
//     TableName: 'User',
//     KeyConditionExpression: '#usr = :user',
//     ExpressionAttributeValues: {
//       '#usr': 'username'
//     },
//     // ExpressionAttributeValues:{
//     //   ':user': username
//     // },
//   }).promise();
// }

/********************************************
 * Display all Requests made by employee 
 ********************************************/
export function viewUserRequests(username: string): Promise<any> {
  // console.log(username);
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

// - Post a new reimbursement request to the table of reimbursement requests.
export function submitRequest(reimbursement): Promise<any> {
  // VERY IMPORTANT! The parameter 'reimbursement' must be defined in the
  // service that calls this method. The service should construct a reimbursement
  // from the inputs supplied by a logged in employee.
  return docClient.put({
      TableName: 'reimbursement',
      Item: reimbursement
  }).promise();
}

export function saveRequest(items): Promise<any> {
  return docClient.put({
    TableName: 'Reimbursment',
    Item: items
  }).promise();
}
