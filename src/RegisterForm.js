import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import './loginform.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


function RegisterForm() {

    const [registerData, setregisterData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
    });
    const [error, setError] = useState({
        name: null,
        email: null,
        password: null,
        username: null,
        password: null,
        confirmpassword: null,

    });
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordconfirmShown, setPasswordconfirmShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const toggleConfirmPassword = () => {
        setPasswordconfirmShown(!passwordconfirmShown);
    };
    const spaceRegex = /\s/g;

    const logincontrol = (e) => {
        console.log(e.target.name, e.target.value);

        if (e.target.name === "email") {
            setregisterData({
                ...registerData,
                email: e.target.value,
            });
            setError({
                ...error,
                email: e.target.value.length === 0 ? "Email is required" : !e.target.value.match(/^\b[A-Z][A-Z 0-9._%-]+@[A-Z0-9]+\.[A-Z]{2,4}\b$/i) ? "Email not valid" : null,
            });
        } else if (e.target.name === "name") {
            setregisterData({
                ...registerData,
                name: e.target.value,
            });
            setError({
                ...error,
                name: e.target.value.length === 0 ? "Name is requierd" : null,
            });

        } else if (e.target.name === "username") {
            setregisterData({
                ...registerData,
                username: e.target.value,
            });
            //Function to check for white space
            function spacecheck(s) {
                return spaceRegex.test(s);
            }
            //Variable holdes true or false (the return of spacecheck function)
            let sCheck = spacecheck(registerData.username);
            
            setError({
                ...error,
               // e.target.value.length === 0 ? "Username is requierd" : e.target.length,
                username:e.target.value.length === 0 ? "UserName is required":sCheck === true
            ? "Please enter userName without spaces":null,
            });

        } else if (e.target.name === "password") {
            setregisterData({
                ...registerData,
                password: e.target.value,
            });
            setError({
                ...error,
                password: e.target.value.length === 0 ? "password is required" : e.target.value.length < 8 ? "Minimum length is 8 characters" : !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)?"Password must contain at least one lowercase,one uppercase,at least one digit and special character":null,
            });
        }else if (e.target.name === "confirmpassword") {
            setregisterData({
                ...registerData,
                confirmpassword: e.target.value,
            });
            setError({
                ...error,
                confirmpassword: e.target.value.length === 0 ? "password is required" : e.target.value.length < 8 ? "Minimum length is 8 characters" :e.target.value !== registerData.password ? "Password don't matche":null,
            });

        } 
    }
    const submited = (e) => {
        e.preventDefault();
        if (!error.email && !error.password && !error.name && !error.username && !error.confirmpassword) {
            console.log("submitted")
        }
    }

    return (
        <>
            <div className="bg-danger bg-gradient p-2 text-white bg-opacity-75" style={{ height: '150vh' }}>
                <form className="container col-4 border border-4 rounded-3 d-grid gap-1" style={{ marginTop: "35vh" }} onSubmit={e => submited(e)}>
                    <h1 className="text-center">Register Form</h1>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-2 fw-bold">Name</label>
                        <input type="text" className={`form-control ${error.name ? "border-danger" : null}`} id="name" aria-describedby="nameHelp" value={registerData.name} onChange={(e) => logincontrol(e)} name="name" />
                    </div>
                    <div id="nameHelp" className="form-text text-light fs-5"> {error.name}</div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fs-2 fw-bold">Email Address</label>
                        <input type="email" className={`form-control ${error.email ? "border-danger" : null}`} id="email" aria-describedby="emailHelp" value={registerData.email} onChange={(e) => logincontrol(e)} name="email" />
                    </div>
                    <div id="emailHelp" className="form-text text-light fs-5"> {error.email}</div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fs-2 fw-bold">User Name</label>
                        <input type="text" className={`form-control ${error.username ? "border-danger" : null}`} id="username" aria-describedby="usernameHelp" value={registerData.username} onChange={(e) => logincontrol(e)} name="username" />
                    </div>
                    <div id="usernameHelp" className="form-text text-light fs-5"> {error.username}</div>

                    <div className="mb-3 pass">
                        <label htmlFor="exampleInputPassword1" className="form-label fs-2 fw-bold">Password</label>
                        <input type={passwordShown ? "text" : "password"} className={`form-control ${error.password ? "border-danger" : null}`} id="exampleInputPassword1" value={registerData.password} onChange={(e) => logincontrol(e)} name="password" />
                            <i onClick={togglePassword} className="eye-icon"><FontAwesomeIcon icon={faEye} /></i>
                    </div>
                    <div id="exampleInputPassword1Help" className="form-text text-light fs-5"> {error.password}</div>
                    <div className="mb-3 pass">
                        <label htmlFor="InputconfirmPassword1" className="form-label fs-2 fw-bold">Confirm Password</label>
                        <input type={passwordconfirmShown ? "text" : "password"} className={`form-control ${error.confirmpassword ? "border-danger" : null}`} id="InputconfirmPassword1" value={registerData.confirmpassword} onChange={(e) => logincontrol(e)} name="confirmpassword" />
                        <i onClick={toggleConfirmPassword} className="eye-icon"><FontAwesomeIcon icon={faEye} /></i>
                    </div>
                    <div id="InputconfirmPassword1Help" className="form-text text-light fs-5"> {error.confirmpassword}</div>


                    <button type="submit" disabled={error.email || error.password || error.username || error.name || error.confirmpassword} className="btn btn-danger col-10 offset-1">Submit</button>
                    <br></br>

                </form>
            </div>

        </>
    );
}
export default RegisterForm;