import React, { PureComponent } from 'react';
var firebase = require('firebase/app');
require('firebase/auth')
require('firebase/database')
const firebaseConfig = {
  apiKey: "AIzaSyClPf_SoZryTPSaCuVmJ2gt47gpQNP59pw",
  authDomain: "login-signup-278ae.firebaseapp.com",
  databaseURL: "https://login-signup-278ae.firebaseio.com",
  projectId: "login-signup-278ae",
  storageBucket: "login-signup-278ae.appspot.com",
  messagingSenderId: "970696508085",
  appId: "1:970696508085:web:c05f45f7bdc781a1c174fc",
  measurementId: "G-ZW9H46JDT1"
};
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
class Auth extends PureComponent {
  signIn(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const promise= firebase.auth().signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('btn')
      console.log(lout)
      lout.classList.add('lout');
      var lin = document.getElementById('btn2')
      lin.classList.add('lout');
      var lup = document.getElementById('logout')
      lup.classList.remove('lout');
      var err = "Welcome" + user.user.email;
      this.setState({err:err})
    });

    promise.catch((error) => {
   var erro = error.message;
  console.log(erro);
    this.setState({err : erro})
});

  }
signUp()
{
  const email = this.refs.email.value;
  const password = this.refs.password.value;
  const auth= firebase.auth();
  console.log(email,password);
  const promise= auth.createUserWithEmailAndPassword(email, password);



  promise.catch((error) => {
  var erro = error.message;
  console.log(erro);
  this.setState({err : erro})
  });
}
signOut(){
      var err = "Thanks";
      this.setState({err:err})
  firebase.auth().signOut();
    var lout = document.getElementById('logout')
    lout.classList.add('lout');
    var lin = document.getElementById('btn')
    lin.classList.remove('lout');
    var lup = document.getElementById('btn2')
    lup.classList.remove('lout');
    var google = document.getElementById('btn3')
    google.classList.remove('lout');
}
google(){
  firebase.auth().signInWithPopup(provider).then(result => {
var token = result.credential.accessToken;
var user = result.user;
console.log(user)
var err = "Welcome "+ user.displayName;
this.setState({err:err})
console.log(token)

var lout = document.getElementById('btn')
console.log(lout)
lout.classList.add('lout');
var lin = document.getElementById('btn2')
lin.classList.add('lout');
var google = document.getElementById('btn3')
google.classList.add('lout');
var lup = document.getElementById('logout')
lup.classList.remove('lout');

})
.catch(function(error) {
var errorMessage = error.message;
console.log(errorMessage)
});

}

constructor(props) {
  super(props);
  this.state = {
    err:'Welcome'
  };
  this.signIn=this.signIn.bind(this)
  this.signUp=this.signUp.bind(this)
  this.signOut=this.signOut.bind(this)
  this.google=this.google.bind(this)
}
  render() {
    return (
      <div>
      <div className="box">
      <h1>{this.state.err}</h1>

      <input type="email" name="email" ref="email" placeholder="email" className="email"/>

      <input type="password" ref="password" placeholder="*******" className="password"/>

      <button onClick={this.signIn} id="btn" className="btn">Sign In</button>

      <button onClick={this.signUp} id="btn2">Sign Up</button>
  <button onClick={this.google} id="btn3">LogIn with Google</button>
<button id="logout" className="lout" onClick={this.signOut} >Sign Out</button>
      </div>

      </div>
    );
  }

}

export default Auth;
