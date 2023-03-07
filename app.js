import yargs from 'yargs/yargs';
import {getAuth} from "firebase/auth"
import {  initializeApp } from "firebase/app";
import {
    signInWithEmailAndPassword,
  } from "firebase/auth";
import {firebaseConfig} from "./firebaseconfig.js"

/**
 * Firebase config example to import
 * firebaseConfig = { 
    apiKey: "...,
    authDomain: "yourdomain.firebaseapp.com",
    databaseURL: "https://yourdomain.firebaseio.com",
    projectId: "yourdomain",
    storageBucket: "yourdomain.appspot.com", //default
    messagingSenderId: "...",
    appId: "..."
}
 */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firebaseLoginUser = (
    email,
    password
  ) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

yargs(process.argv.slice(2))
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('user [mail] [password]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('mail', {
      type: 'string',
      default: '',
      describe: 'the user mail'
    }),
    yargs.positional('password', {
        type: 'string',
        default: '',
        describe: 'the user password'
      })
  }, (argv) => {
      firebaseLoginUser(argv.mail, argv.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user")
          console.log(user)
       }).catch((error)=>{
            console.log("error")
            console.log(error)
       })
    })
  .help()
  .argv