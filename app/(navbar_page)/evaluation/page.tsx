import Evaluation from "@/components/privates/evaluation/Evaluation";
import EvaluationEmployee from "@/components/privates/evaluation/EvaluationEmployees";
import React from "react";

const page = () => {
  return (
    <div className="rounded-md border bg-white px-12 py-10 shadow-md max-sm:p-2">
      <EvaluationEmployee />
    </div>
  );
};

export default page;
