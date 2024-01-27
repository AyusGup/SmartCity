import { useState,useRef } from "react";

function Signup(props){
	const clearIntervalRef = useRef();
	const [timer,setTimer] = useState(120);
	const [isVerified,setVerified] = useState(false);
	const [inputOtp,setInput] = useState(0);
	const [otp,setOtp] = useState(0);
	const [formD, setForm] = useState({
		username: "",
		contact: 0,
		email: "",
		password: "",
		MyFile:""
	  });
	
	function handleChange(event) {
	const { name, value } = event.target;

	setForm(prevForm => {
		return {
		...prevForm,
		[name]: value
		};
	});
	}
	const validatePhoneNumber = (phoneNumber) => {
		const phoneString = phoneNumber.toString();
		const phoneRegex = /^(\d[-\s]?){10}$/;
		return phoneRegex.test(phoneString);
	};

	function submitNote(event) {
	event.preventDefault();

	if(isVerified === false){

		document.getElementById("alert").innerHTML="*please verify your email";
		return;
	}
	if (!validatePhoneNumber(formD.contact)) {
		document.getElementById("alert").innerHTML="*Please enter a valid 10-digit phone numberl";
		return;
	  }
	props.onAdd(formD);
	setForm({
		username: "",
		contact: 0,
		email: "",
		password: "",
		MyFile:""
	});
	}

	async function handleFileUpload(e){
		const file= e.target.files[0];
		const base64= await convertToBase64(file);
		console.log("uploaded");
		setForm({...formD, MyFile: base64});
	}
    
	function setTime(){
		setOtp(0);
		setTimer(120);
		clearInterval(clearIntervalRef.current);
		return;
	}
	async function sendOtp(){
		document.getElementById("useremail").focus();
		const res= await props.otp(formD.email);
		setOtp(res);
		clearIntervalRef.current = setInterval(()=>{
			setTimer(prevTimer=> prevTimer-1);
		}, 1000);
		document.getElementById("alert").innerHTML="";
	}

	function verify(){
       if(inputOtp === otp){
		setVerified(true);
		clearInterval(clearIntervalRef.current)
	   }
	}


    return(
        <div>
        <section className="prompt">
        <h1 style={{fontWeight:"bolder",fontSize:"1.8rem"}}>Sign up</h1>
        <hr />
		<form className="signupform">
	      	<section>
				<label htmlFor="username">Name</label>
				<input id="username"
				 name="username"
				 type="text"
				 autoComplete="username" onChange={handleChange}
				 value={formD.username}
				 required />
			</section>
			<section>
				<label htmlFor="contact">Contact</label>
				<input id="contact"
				 name="contact"
				 type="tel"
				 autoComplete="contact" onChange={handleChange}
				 value={formD.contact}
				 required />
			</section>
			<section>
				<label htmlFor="useremail">Email</label>
				<input id="useremail"
				 name="email"
				 type="email"
				 autoComplete="useremail" onChange={handleChange}
				 value={formD.email}
				 required />
			</section>
			{otp === 0? <button onClick={sendOtp} style={{borderRadius:"10%",padding:".5%"}} id="sendOtp">Send OTP</button> : 
			isVerified === false? 
			<>
			  <input placeholder="enter otp" onChange={(e)=>{setInput(e.target.value)}}/>
			  <button onClick={verify} style={{borderRadius:"10%",padding:".5%"}}>verify</button>
			  <p style={{color:"red"}}>{timer >=0 ? timer: setTime()}</p>
			</> : <p style={{color:"green"}}>verified</p>
			}
			<section>
				<label htmlFor="new-password">Password</label>
				<input id="new-password"
				 name="password"
				 type="password"
				 autoComplete="new-password" onChange={handleChange}
				 value={formD.password}
				 required />
			</section>
			<section>
				<input
					type="file" 
					lable="Image"
					name="MyFile"
					id="file-upload"
					accept=".jpeg, .png, .jpeg"
					placeholder="upload"
					onChange={(e) => handleFileUpload(e)}
				/>
			</section>
			<button type="submit" className="button" onClick={submitNote} style={{fontWeight:"bold",fontSize:"1.2rem" , backgroundColor: "rgb(63 105 241)",color: "white",}}>Sign up</button>
			<p id="alert" style={{color:"red" , fontSize:"14px"}}></p>
		</form>
			<p className="help">Already have an account? <a href="/">Sign in</a></p>

		</section>
        </div>
    );
}

export default Signup;

function convertToBase64(file){
	return new Promise((resolve,reject) => {
	  const fileReader= new FileReader();
	  fileReader.readAsDataURL(file);
	  fileReader.onload = () => {
		resolve(fileReader.result)
	  };
	  fileReader.onerror = (err) => {
		reject(err);
	  }
	})
  }