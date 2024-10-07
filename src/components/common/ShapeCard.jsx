import React from "react";
import Image from "next/image";

export const ShapeCard = ({children, className=''}) => {
  return (
    <div className={`shadow shape-card relative border-none p-2 dark:bg-shape-card-color-dark bg-shape-card-color-light rounded-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const ShapeCardSm = ({children, className=''}) => {
  return (
    <div className={`shadow shape-card-sm relative border-none p-2 dark:bg-shape-card-color-dark bg-shape-card-color-light rounded-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
export const ShapeCardMd = ({children, className=''}) => {
  return (
    <div className={`shadow shape-card-md relative border-none p-2 dark:bg-shape-card-color-dark bg-shape-card-color-light rounded-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const ShapeCardSmall = ({ children, className }) => {
  return (
    <div
      className={`${className}`}
    >
      {children}
    </div>
  );
};



