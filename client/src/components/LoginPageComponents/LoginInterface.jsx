import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom";
import { loginFunction } from "../../services/Apis";
import ForgotPassword from "../../pages/ForgotPassword";


const LoginInterface=()=>{

    const [username,setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password,setPassword] = useState("");
    

    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword)
    };

    const handleSubmit= async (e)=>{
        e.preventDefault();

        const userData={
            username,
            password
        }

        loginFunction(userData);
        console.log(userData)

    };

    return(
        <form onSubmit={handleSubmit}>   
            <div className="bg-slate-50 flex flex-col justify-center h-4/6 rounded-lg space-y-5 p-20 pt-32">
                <TextField
                    variant="outlined"
                    label="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                />

                <TextField
                    required
                    variant="outlined"
                    label="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type={showPassword?"text":"password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword? <Visibility/>:<VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Button variant="contained" type="submit">Login</Button>
                       
                <Link to={"/reset-password"} className="text-center underline hover:text-blue-600">
                        Forgot password?
                </Link>
            </div> 
        </form>
    )
}


export default LoginInterface;