import React,{useState} from 'react';

function Login(props) {
    const [formDetails, setformDetails] = useState({
        email: "",
        password: ""
      });
    
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
  return (
    <div>
    <section className="prompt">
    <h1>Sign in</h1>
    <hr />
    <form action="/login/password" method="post">
    <section>
				<label htmlFor="useremail">Email</label>
				<input id="useremail"
				 name="email"
				 type="email"
				 autoComplete="useremail" onChange={handleChange}
				 value={formDetails.email}
				 required />
			</section>
			<section>
				<label htmlFor="new-password">Password</label>
				<input id="new-password"
				 name="password"
				 type="password"
				 autoComplete="new-password" onChange={handleChange}
				 value={formDetails.password}
				 required />
			</section>
      <button type="submit" className="button" onClick={submitNote}>Sign in</button>
      <p id="alert" style={{color:"red" , fontSize:"14px"}}></p>
    </form>
    <p style={{textAlign:"center"}}>or</p>
    <p className="help">Don't have an account? <a href="/signup">Sign up</a></p>
    <p style={{textAlign:"center"}}>or</p>
    <p className="help">Want to report anonymously? <a href="/report">Report</a></p>
		</section>
    </div>
  );
}

export default Login;
