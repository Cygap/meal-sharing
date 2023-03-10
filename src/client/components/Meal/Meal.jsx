import React from "react";
export default function Meal({ title, description }) {
  return (
    <p>
      <b>{title}:</b> {description}
    </p>
  );
}
