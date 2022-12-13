import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <Link to="/">home</Link>
      <Link to="/chat" className="text-red-400">
        chat
      </Link>
      <Link to="postcreate">postcreate</Link>
      <Link to="myprofile">myprofile</Link>
    </>
  );
};
