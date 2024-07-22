import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Swal from "sweetalert2";
import AddNewInterview from "@/components/MockInterview/AddNewInterview";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Error",
        text: "User Logged Out",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => navigate("/"));
    }
  }, [isLoggedIn, navigate]);

  if (open) {
    return (
      <div>
        <div className="border rounded-md p-3 m-2 bg-slate-600">
          <h1>
            Working on a progress ...{" "}
            <span className="font-bold ">Interview</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-purple-100 min-h-screen">
      <h2 className="font-bold text-2xl text-purple-700 animate-fade-in-down">
        Working in progress.....
      </h2>
      <h2 className="font-bold text-2xl text-green-700 animate-text-fade-in">
        Dashboard
      </h2>
      <h2 className="text-gray-500 animate-text-fade-in">
        Create Your Interview With AI
      </h2>

      <div className="mt-5">
        <AddNewInterview />
      </div>
    </div>
  );
};

export default Dashboard;
