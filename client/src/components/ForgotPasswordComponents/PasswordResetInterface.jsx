import { Button, TextField } from "@mui/material";
import { useEffect, useState ,useRef,useCallback} from "react";
import { Link } from "react-router-dom";




const ResetPasswordInterface=()=>{

    const [emailStatus,setEmailStatus] = useState(false);

    const sendPasswordResetRequest=()=>{
        setEmailStatus(true);
        console.log("Send email")
    }

    const SendEmail=()=>{
        return(
        <>
        <p className="text-lg">Enter your email</p>
                <TextField
                    variant="outlined"
                    label="email"
                    type="email"
                    required
                    />
                <Button variant="contained" onClick={sendPasswordResetRequest}>Request new password</Button>
       </>
        )
    }

    const ResendEmail=({ initialSeconds })=>{
        const [seconds, setSeconds] = useState(initialSeconds);
        const CountdownTimer = () => {
            const intervalRef = useRef();
          
            const startTimer = useCallback(() => {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
          
              setSeconds(initialSeconds); // Reset timer to initial value
          
              intervalRef.current = setInterval(() => {
                setSeconds((prevSeconds) => {
                  if (prevSeconds <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                  }
                  return prevSeconds - 1;
                });
              }, 1000);
            }, [initialSeconds]);
          
            const formatTime = (seconds) => {
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
            };
          
            return (
              <div style={{ textAlign: 'center', marginTop: '20%' }}>
                {seconds > 0 ? (
                  <div style={{ fontSize: '2rem' }}>{formatTime(seconds)}</div>
                ) : (
                  "Time's up!"
                )}
              </div>
            );
          };
          
        return(
            <>
            <p className="text-center">Didn't get email?</p>
            {seconds==0?"":<Link className="underline" onClick={sendPasswordResetRequest}>Resend Password Reset Form</Link>}
            <CountdownTimer initialSeconds={10}/>
            </>
        )
    }
    
    return(
        <div className="bg-slate-50 flex flex-col justify-center h-4/6 rounded-lg space-y-5 p-20 pt-32">
            {emailStatus?<ResendEmail initialSeconds={10}/>:<SendEmail/>}
        </div>
    )
}

export default ResetPasswordInterface;