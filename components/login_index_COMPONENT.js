import React, { Component } from 'react';
import NavBar from './navbar';
import { reduxForm } from 'redux-form';
import { checkLogin } from '../actions/index';
import SweetAlert from 'sweetalert-react';

class Login extends Component {

  componentWillReceiveProps() {
    //console.log('this is component will receive: ', this.props);
  }

  componentWillMount() {
    //console.log(moment.tz(new Date() , "America/Los_Angeles").unix());
  }

  render() {
    const logo = {
        display: 'none'
      }

    const { fields: { username, password, logMeIn }, handleSubmit } = this.props;

    return (
      <div>
      <NavBar/>
        <div className="container-login">
        <form id="signup" method="post" onSubmit={handleSubmit(this.props.checkLogin)} >
          <div className="header">
            <img src="./img/lu-logo.png" id="logo"/>
            <p>Login to the LinkUp Network</p>
            <span id="msg" className="msg">{}</span>
          </div>
          <div className="sep"></div>
          <div className="inputs">
            <input type="text" name="username" id="username" {...username} placeholder="e-mail or username" autofocus />
            <input type="password" name="password" id="password" {...password} placeholder="password" />
              <button id="submit" type="submit">LOGIN</button>
              <input type="hidden" id="logMeIn" name="logMeIn" {...logMeIn} />
              <center><span className="notetext">* Your username and password will work across the LinkUp network.</span></center>
          </div>
          </form>
          <a id="registerButton" href="register.html">No account? Register here.</a>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['username','password','logMeIn']
}, null, { checkLogin })(Login);
