/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Lightbulb } from "@mui/icons-material";
import React from "react";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your Browser does not support audi ");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex == index && "bg-cyan-500 text-white"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
        <div className="border rounded-lg p-5 bg-cyan-100 my-10">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note: </strong>
          </h2>
          <h2 className="text-sm text-cyan-500 my-2">
            Testing Purpose Work on a Progress.....
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
