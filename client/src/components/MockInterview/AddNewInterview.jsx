/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState([]);
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(jobPosition, jobDesc, jobExperience);
      const response = await axios.post(
        `http://localhost:5001/api/interview`,
        {
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      setJsonResponse(response.data.data);
      if (response) {
        setOpenDialog(false);
        console.log(response.data.data);
        navigate(`/dashboard/interview/${response.data.data.mockId}`);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-green-500 hover:scale-105 hover:shadow-lg cursor-pointer transition-transform duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center text-white">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="bg-purple-100 animate-fade-in-down">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-purple-700">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="text-green-700">
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-2">
                    <label className="text-purple-700">
                      Job Role/ Job Position
                    </label>
                    <Input
                      className="border-green-500"
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label className="text-purple-700">
                      Job Description/ Tech Stack (In Short)
                    </label>
                    <Textarea
                      className="border-green-500"
                      placeholder="Ex. Node Js , Express Js, Postgres Sql"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-2">
                    <label className="text-purple-700">
                      Year of Experience
                    </label>
                    <Input
                      className="border-green-500"
                      placeholder="Ex.5"
                      type="number"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-5">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-purple-700 hover:bg-green-500 hover:text-white transition-colors duration-300"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-green-500 text-white hover:bg-purple-700 transition-colors duration-300"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating From Ai'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
