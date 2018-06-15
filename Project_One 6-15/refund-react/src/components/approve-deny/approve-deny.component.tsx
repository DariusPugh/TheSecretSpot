import * as React from 'react';

export class ApproveDenyComponent extends React.Component<any, any> {

  
    constructor(props: any) {
      super(props);
    }
  
    public updateApprove = (status: any, event:any) => {   
      console.log(this.props.timeSub) ;
      fetch('http://localhost:3001/reimbursements/username/requests/approve', {
        body: JSON.stringify({status, timeSubmitted :this.props.timeSub, username:this.props.username}),
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(resp => {
          console.log(resp.status)
          if (resp.status === 401) {
            this.props.updateError('Invalid Credentials, try again.')
            return;
          }
          if (resp.status === 404) {
            this.props.updateError('Page is not found.')
            return;
          }
          if (resp.status === 500) {
            this.props.updateError('Page is not found.')
            return;
          }
          if (resp.status === 200) {
            this.props.history.push('/view-table');
          }
          return;
        })
        .catch(err => {
          console.log(err)
        })
    }
  


    public render() {
      return (
        <div>
            <button className="btn btn-primary"  onClick={(event) => this.updateApprove('approved',event)}>Approve</button>
            <button className="btn btn-danger"  onClick={(event) => this.updateApprove('denied',event)}>Deny</button>
        </div>
      );
    }
  }