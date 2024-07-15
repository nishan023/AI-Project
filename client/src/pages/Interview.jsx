/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const Interview = () => {
  const { mockId } = useParams();
  const access_token = localStorage.getItem("access_token");
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebcamEnabled] = useState(false);
  const isFetched = React.useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetched.current) {
      // Only fetch if not already fetched
      const fetchData = async () => {
        try {
          console.log(mockId);
          const response = await axios.get(
            `http://localhost:5001/api/interview/${mockId}`,
            {
              headers: {
                Authorization: access_token,
              },
            }
          );
          console.log(response.data.data);
          setInterviewData(response.data.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
      isFetched.current = true; // Mark as fetched
    }
  }, [mockId, access_token]);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/ Job Position: </strong>
                  {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description / Tech Stack: </strong>
                  {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Experience/ Year of Experience: </strong>
                  {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to Start Your AI Generated
              Mock Interview. It has 5 questions which you can answer and at the
              end you will get a report based on your answers. Note: we never
              record your video. Web cam access can be disabled at any time if
              you want.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
          )}
          <Button
            variant="ghost"
            className="m-2"
            onClick={() => setWebcamEnabled(true)}
          >
            Enable Web cam and Microphone
          </Button>
          <Button onClick={() => setWebcamEnabled(false)}>Close Web Cam</Button>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Button
          onClick={() => navigate(`/dashboard/interview/${mockId}/start`)}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default Interview;
