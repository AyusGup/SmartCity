import React,{useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

function Login(props) {
    const [formDetails, setformDetails] = useState({
        email: "",
        password: ""
      });
    const [searchParams] = useSearchParams();

    function handleChange(event) {
        const { name, value } = event.target;
    
        setformDetails(prevNote => {
        return {
            ...prevNote,
            [name]: value
        };
        });
    }
    
    function submitNote(event) {
    props.onCheck(formDetails);
    setformDetails({
      email: "",
      password: ""
    });
    event.preventDefault();
    }

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    
    setformDetails({
      email: email ,
      password: password,
    });
  }, []);
	
  return (
    <div>
    <section className="prompt">
    <h1 style={{fontSize:"1.5rem",fontWeight:"bolder"}}>Sign In</h1>
    <hr />
    <form action="/login/password" method="post">
    <section>
				<label htmlFor="useremail" style={{fontSize:"1.3rem"}}>Email</label>
				<input id="useremail"
				 name="email"
				 type="email"
				 autoComplete="useremail" onChange={handleChange}
				 value={formDetails.email}
				 required />
			</section>
			<section>
				<label htmlFor="new-password" style={{fontSize:"1.3rem"}}>Password</label>
				<input id="new-password"
				 name="password"
				 type="password"
				 autoComplete="new-password" onChange={handleChange}
				 value={formDetails.password}
				 required />
			</section>
      <button type="submit" className="button" onClick={submitNote} style={{backgroundColor: "rgb(63 105 241)",color: "white",fontSize:"1.2rem",fontWeight:"bolder"}}>Sign In</button>
      <p id="alert" style={{color:"red" , fontSize:"14px"}}></p>
    </form>
    <p style={{textAlign:"center"}}>or</p>
    <p className="help">Don't have an account? <a href="/signup">Sign Up</a></p>
    <p style={{textAlign:"center"}}>or</p>
    <p className="help">Want to report anonymously? <a href="/report">Report</a></p>
		</section>
    </div>
  );
}

export default Login;
