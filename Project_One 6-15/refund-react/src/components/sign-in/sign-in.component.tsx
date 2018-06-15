import * as React from 'react';
import { NavSignInComponent } from '../nav.sign-in.component';

export class SignInComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateUsername = (e: any) => {
    const username = e.target.value;
    this.props.updateUsername(username);
  }

  public updatePassword = (e: any) => {
    const password = e.target.value;
    this.props.updatePassword(password);
  }

  public submit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.props; // destructuring
    fetch('http://localhost:3001/users/login', {
      body: JSON.stringify({username, password}),
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
        if (resp.status === 200) {
          this.props.history.push('/view-table');
        }
        return;
      })
      .catch(err => {
        this.props.updateError('Unable to log in at this time, please try again later');
      })
  }

  public render() {
    return (
    <form>
    <NavSignInComponent />
      <form className="form-signin" onSubmit={this.submit}>
        <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-4 font-weight-normal">Welcome to Super Reimburser!</h1>
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input value={this.props.username}
          onChange={this.updateUsername}
          type="text" id="inputUsername"
          className="form-control"
          placeholder="Username"
          required />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input value={this.props.password}
          onChange={this.updatePassword}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required />
        { this.props.errorMessage !== '' &&
          <div id="error-message">
            {this.props.errorMessage}
          </div>
        }
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </form>
    );
  }
}