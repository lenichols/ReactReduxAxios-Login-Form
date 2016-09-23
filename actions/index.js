import axios from 'axios';
import { browserHistory } from 'react-router';
import moment from 'moment';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const POST_MESSAGE = 'POST_MESSAGE';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const SEND_PMMESSAGE = 'SEND_PMMESSAGE';
export const WHOS_LOGGED_IN = 'WHOS_LOGGED_IN';
export const LOG_ME_OUT = 'LOG_ME_OUT';

const MSGS_URL = 'https://xxxxxx.com/api/messages';
const LOGIN_URL = "https://xxxxxx.com/api/login";
const LOGOUT_URL = "https://xxxxxx.com/api/logout";
const POST_MSG_URL = "https://xxxxxx.com/api/send";
const WHOS_ONLINE_URL = "https://xxxxxx.com/api/whosonline";

const CHAT_DASHBOARD = "/chatroom";
const NETWORK_LOGIN = "/login";

const uname = 'suser';
let intervalId;

export function logOut(loggedInUser) {
  const request = axios.get(`${LOGOUT_URL}/${loggedInUser}`)
    .then(response => {

      if(response) {
        localStorage.setItem("uid", "");
        localStorage.removeItem("sesstime-unix");
        localStorage.removeItem("sesstime-str");
        browserHistory.push('/');
        return;
      }
    });
}


export function checkLogin(props) {

  var config = {
    headers: {'Authorization': 'tokenString'}
  };

  return dispatch => {
    const loginrequest = axios.post(`${LOGIN_URL}`, props)
      .then(response => {

        const showmsg = response.data;

        if(showmsg.name) {

          var localDate = new Date();
          var localMoment = moment();

          localStorage.setItem("uid", showmsg.name);
          localStorage.setItem("token", showmsg.token);
          localStorage.setItem("sesstime-unix", localDate.valueOf());
          localStorage.setItem("sesstime-str", localMoment.format());

          browserHistory.push(`${CHAT_DASHBOARD}?user=${showmsg.name}&role=${showmsg.role}`);
        } else {
          let output = document.getElementById('msg');
          output.innerHTML = response.data;
        }

        dispatch(
          { type: CHECK_LOGIN,
            payload: loginrequest
          }
        );
      });
  };
}

export function loadSpinner() {

}

export function hideSpinner() {

}
