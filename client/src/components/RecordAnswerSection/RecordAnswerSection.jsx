/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";

const RecordAnswerSection = () => {
  const [userAnswer, setUserAnswer] = useState();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  const SaveUserAnswers = () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast("Error while saving your answer, Please Record again");
        return;
      }
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center justify-center flex-cols">
      <div className="flex flex-col justify-center items-center rounded-lg p-5">
        <h1>Put Camera png here please</h1>
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10" onClick={SaveUserAnswers}>
        {isRecording ? (
          <h2 className="text-red-600">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "     Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show Answer</Button>
    </div>
  );
};

export default RecordAnswerSection;
