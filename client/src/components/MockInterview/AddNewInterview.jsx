import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNewInterview = () => {
  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer translate-all">
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
    </div>
  );
};

export default AddNewInterview;
