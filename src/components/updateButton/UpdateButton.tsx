"use client";

import React from "react";
import { useFormStatus } from "react-dom";

function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-cartColor text-center text-white rounded-md cursor-pointer disabled:bg-pink-200 p-2 disabled:cursor-not-allowed m-w-96"
    >
      {pending ? "Updating" : "Update"}
      {/* Update */}
    </button>
  );
}

export default UpdateButton;
