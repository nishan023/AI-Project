import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionSection from "@/components/QuestionSection/QuestionSection";
import RecordAnswerSection from "@/components/RecordAnswerSection/RecordAnswerSection";
import { Button } from "@/components/ui/button";

const StartInterview = () => {
  const { mockId } = useParams();
  const access_token = localStorage.getItem("access_token");
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const isFetched = React.useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      // Only fetch if not already fetched
      const fetchData = async () => {
        try {
          console.log(mockId);
          const response = await axios.get(
            `http://localhost:5001/api/interview/${mockId}/start`,
            {
              headers: {
                Authorization: access_token,
              },
            }
          );
          console.log(response.data.data);
          setMockInterviewQuestion(response.data.data);
        } catch (err) {
          console.log(err);
        }
      };

      const fetchData1 = async () => {
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
      fetchData1();
      isFetched.current = true; // Mark as fetched
    }
  }, [mockId, access_token]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gp-10">
      <QuestionSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
      />

      <RecordAnswerSection />
      <div className="flex justify-between space-x-4 mt-4">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setActiveQuestionIndex((prevValue) => prevValue + 1)}
        >
          Next Question
        </Button>
        <Button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setActiveQuestionIndex((prevValue) => prevValue - 1)}
        >
          Previous Question
        </Button>
      </div>
    </div>
  );
};

export default StartInterview;
