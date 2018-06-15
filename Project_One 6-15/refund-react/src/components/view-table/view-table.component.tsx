import * as React from 'react';
import { IViewTable } from '../../reducers';
import { NavUserComponent } from '../nav.user.component';

interface IProp extends IViewTable {
  updateUsername: (username: string) => void
  updateView: (username: string) => void
}

export class ViewTableComponent extends React.Component<IProp, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateUsername = (event: any) => {
    console.log(event.target.value)
    this.props.updateUsername(event.target.value);
  }

  public submit = (e: any) => {
    this.props.updateView(this.props.username);
    console.log(this.props.updateView)
  }

  public render() {
    return (
    <form>
      <NavUserComponent/>
      <div className="container">
        <form className="row" onSubmit={this.submit}>
          <div className="col-sm">
            <button type="submit" className="btn btn-dark">Search/Refresh</button>
          </div>
            <div className="col-sm">
            </div>
            <div className="col-sm">
              Username:
            <input id="status-input"
                onChange={this.updateUsername}
                value={this.props.username}
                type="string"
                placeholder="pending" />
            </div>
        </form>
        <div className="row">
          <div className="col">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
               <tbody id="reimbursement-table-body">
                {
                  this.props.reimbursements.length > 0 &&
                  this.props.reimbursements.map(reimbursements =>
                    <tr key={reimbursements.username}>
                      <td>${reimbursements.items[0].amount}</td>
                      <td>{reimbursements.items[0].description}</td>
                      <td>{reimbursements.items[0].title}</td>
                      <td>{reimbursements.status}</td>
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