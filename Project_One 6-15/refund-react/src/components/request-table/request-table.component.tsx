import * as React from 'react';
import { IRequestTable } from '../../reducers';
import { NavUserComponent } from '../nav.user.component';
import { ApproveDenyComponent } from '../approve-deny/approve-deny.component';

function timeConverter(UNIX_timestamp: number){
  const a = new Date(UNIX_timestamp);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
  
}
interface IProp extends IRequestTable {
  updateStatus: (status: string) => void
  updateReimbursement: (status: string) => void
}

export class RequestTableComponent extends React.Component<IProp, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateStatus = (event: any) => {
    console.log(event.target.value)
    this.props.updateStatus(event.target.value);
  }

  public submit = (e: any) => {
    this.props.updateReimbursement(this.props.status);
    console.log(this.props.reimbursements)
  }

  public render() {
    return (
    <form>
        <NavUserComponent/>
      <div className="container">
        <form className="row" onSubmit={this.submit}>
          <div className="col-sm">
            <button type="submit" className="btn btn-dark">Search</button>
          </div>
            <div className="col-sm">
            </div>
            <div className="col-sm">
              Status:
            <input id="status-input"
                onChange={this.updateStatus}
                value={this.props.status}
                type="string"
                placeholder="pending"/>
            </div>
        </form>
        <div className="row">
          <div className="col">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                  <th scope="col">Time Submitted</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Approve/Deny</th>
                </tr>
              </thead>
               <tbody id="reimbursement-table-body">
                {
                  this.props.reimbursements.length > 0 &&
                  this.props.reimbursements.map(reimbursements =>
                    <tr key={reimbursements.username}>
                      <td>{reimbursements.username}</td>
                      {console.log(reimbursements.items[0])}
                      <td>${reimbursements.items[0].amount}</td>
                      <td>{reimbursements.items[0].description}</td>
                      <td>{timeConverter(reimbursements.time_submitted)}</td>
                      {console.log(reimbursements)}
                      <td>{reimbursements.items[0].title}</td>
                      <td>{reimbursements.status}</td>
                      <td>{<ApproveDenyComponent timeSub = {reimbursements.time_submitted} username = {reimbursements.username}/>}
                          {/* updateApprove={this.props.updateApprove}
                           updateDeny={this.props.updateDeny}/>} */}
                           </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
    );
  }
}