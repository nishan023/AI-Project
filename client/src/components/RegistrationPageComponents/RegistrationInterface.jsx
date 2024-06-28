import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const RegistrationInterface=()=>{

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailError, setEmailError] = useState("");



    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };


    const handleEmailChange=(e)=>{
        const email = e.target.value;
        setEmail(email);

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email))
            setEmailError("Invalid Email format");
        else 
            setEmailError("");
    };


    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(emailError){
            alert("Please correct the errors in the form")
            return;
        }

        const userData = {
            username,
            email,
            password,
        };

        try{
            const response = await axios.post("api/route",userData);
            console.log("User registration successful", response.data);
        }catch(error)
        {
            console.log("Error during registration");
        }
    };


    return(
        <form onSubmit={handleSubmit}>
        <div className="bg-slate-50 flex flex-col justify-center h-4/6 rounded-lg space-y-5 p-20 pt-32">
            
            <TextField 
                required
                variant="outlined"
                label="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />


            <TextField 
                required
                variant="outlined" 
                label="E-mail" 
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
            />

            <TextField
                    required
                    variant="outlined"
                    label="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
            />

            <Button variant="contained" type="submit">Register</Button>
        </div>
        </form>
    )
}

export default RegistrationInterface;