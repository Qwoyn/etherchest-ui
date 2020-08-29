import React from "react";

export default function selectedGardensTemplate(option) {
    if (option) {
      return <span>{`${option.id} `}</span>;
    } else {
      return <span>Choose your plots...</span>;
    }
  };