import * as React from 'react';
import { NavUserComponent } from '../nav.user.component';


export class RequestFormComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log(props);
      }
    
    public updateAmount = (e: any) => {
        const amount = e.target.value;
        this.props.updateAmount(amount);
      }
    
    public updateDescription = (e: any) => {
        const description = e.target.value
        this.props.updateDescription(description);
      }
    
    public updateTitle = (e: any) => {
        const title = e.target.value
        this.props.updateTitle(title);
      }
    
    
      
      public submit = (e: any) => {
        e.preventDefault();
       
         const {amount, description, title } = this.props; // destructuring
         console.log(amount);
        fetch('http://localhost:3001/reimbursements', {
          body: JSON.stringify([{amount, description, title }]),
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        })
          .then(resp => {
            console.log(resp.status)
            if (resp.status === 401) {
              this.props.updateError('Invalid Credentials')
              return;
            }
            if (resp.status === 200) {
              this.props.history.push('/view-table');
            }
            return;
          })
          .catch(err => {
            alert('unable to post at this time');
          })

      }
    
    
    public render() {
        return (
          <div>
            <form>
                <NavUserComponent/>
                <div className="d-flex justify-content-center">
                <form onSubmit={this.submit}>
                <div className="form-group col-md-">
                    <label htmlFor="input-title">Title</label>
                    <input 
                        value = {this.props.title}
                        onChange = {this.updateTitle}
                        type="text" 
                        className="form-control" 
                        id="input-title" 
                        placeholder="Title"/>
                </div>
                <div className="form-group col-md-">
                    <label htmlFor="input-amount">Amount</label>
                    <input 
                        value = {this.props.amount}
                        onChange = {this.updateAmount}
                        type="number" 
                        className="form-control" 
                        id="input-amount" 
                        placeholder="Amount"/>
                </div>
                <div className="form-group col-md-">
                    <label htmlFor="input-description">Description</label>
                    <input 
                        value = {this.props.description}
                        onChange = {this.updateDescription}
                        type="text" 
                        className="form-control" 
                        id="input-amount" 
                        placeholder="description"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </form>
            </div>
        );
    }
}
