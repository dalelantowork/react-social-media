import axios from "axios";
import { useRef } from "react" 
import "./register.css";
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault();
    if(confirmPassword.current.value !== password.current.value){
      confirmPassword.current.setCustomValidity("Passwords don't match!")
    }else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post("/auth/register", user);  
        history.push("/login")
      } catch (error) {
        console.log(error)
      }
      
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Fastbook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Fastbook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" className="loginInput" ref={username} required />
            <input placeholder="Email" className="loginInput" ref={email} type="email" required/>
            <input placeholder="Password" className="loginInput" ref={password} type="password" minLength="6" required/>
            <input placeholder="Confirm Password" className="loginInput" ref={confirmPassword} type="password" minLength="6" required/>
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to="/login" className="linkCenter">
            <button className="loginRegisterButton" >
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}