import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../services/AuthContext";
import { useSelector } from "react-redux";
import { commonRequest } from "../services/ApiCall";
import { fetchUserData } from "../services/Apis";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  console.log(token, " This is from the profile page");

  const temp = localStorage.getItem("access_token");
  console.log("temp: ", temp);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(temp);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [userId, token]); // Dependencies array: fetch data again if userId or authToken changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const username = userData.username;
  const email = userData.email;
  const id = userData.id;
  return (
    <div className="border rounded-md bg-slate-300 m-3 ">
      Profile this is the profile paage Tes-2xlts A quick brown fox jumps over a
      lazy dog
      <Avatar src="" className=""></Avatar>
      <p>
        {" "}
        this is a username : <span className="font-bold">{username}</span>
      </p>
      <p>
        {" "}
        this is a user email : <span className="font-bold">{email}</span>
      </p>
      <p>
        {" "}
        this is a user id : <span className="font-bold">{id}</span>
      </p>
    </div>
  );
};

export default ProfilePage;
