"use client";

import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

import { gql, request } from "graphql-request";

const postMutation = gql`
  mutation createFeedBackInstance()
`;

// import Form from "next/form";

export default function FeedbackForm() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: function (formData: FormData) {
      return;
    },
  });

  return (
    <>
      <strong>Was this helpful?</strong>
      <p className="mb-3">
        Your feedback helps us make improvements to our content
      </p>
      <form action={""}>
        <div className="mb-2">
          <input
            type="radio"
            name="feedback"
            id="yes"
            value="yes"
            onChange={handleRadioChange}
          />
          <label htmlFor="yes">Yes</label>
        </div>
        <div className="mb-2">
          <input
            type="radio"
            name="feedback"
            id="no"
            value="no"
            onChange={handleRadioChange}
          />
          <label htmlFor="no">No</label>
        </div>
        <div className="mb-2">
          <input
            type="radio"
            name="feedback"
            id="yes-but"
            value="yes, but"
            onChange={handleRadioChange}
          />
          <label htmlFor="yes-but">Yes, but</label>
        </div>
        {selectedOption === "yes, but" && (
          <div className="mb-2">
            <label htmlFor="comments"></label>
            <textarea
              name="comments"
              id="comments"
              className="outline-1"
            ></textarea>
          </div>
        )}

        <button type="submit" className="bg-black text-white p-1">
          Submit
        </button>
      </form>
    </>
  );
}
