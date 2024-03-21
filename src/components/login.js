import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import  Input  from "./forms/input";


const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const { setJwtToken } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
    const { toggleRefresh } = useOutletContext();




    const navigate = useNavigate();
    


    const handleSubmit = async (e) =>{
        e.preventDefault();        
       
        // build the request payload
        let payload = {
            email: email,
            password: password,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        }
        
        try{
            let response = await fetch(`/authenticate`, requestOptions);
            
            let data = await response.json()        
            

            if (data.error){
                setAlertClassName("alert-danger");
                setAlertMessage(data.message);
            }else{
                setJwtToken(data.access_token);
                setAlertClassName("d-none");
                setAlertMessage("");
                toggleRefresh(true);
                navigate("/");

            }
        }catch(err){
            setAlertClassName("alert-danger");
            setAlertMessage(err);
        }
    }


    return(        
        <div className="col-md-6 offset-md-3">
            <h2>Login </h2>
            <hr/>


            <form onSubmit={handleSubmit}>
                <Input 
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                />

                <Input 
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />

                <hr/>
                <input type="Submit" className="btn btn-primary"/>

            </form>
           
        </div>        
    )

}

export default Login;