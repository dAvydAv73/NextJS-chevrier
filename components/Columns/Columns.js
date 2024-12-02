//NextJs/Components/Columns/Columns.js
import React from "react";


export const Columns = ({
  isStackedOnMobile,
  children,
  textColor,
  backgroundColor,
  customClasses,
  customId,
}) => {

  return (
    <div
      className={`py-4 ${customClasses}`}
      style={{ color: textColor, backgroundColor }}
      id={customId}
    >
      <div
        className={`max-w-5xl mx-auto ${
          isStackedOnMobile ? "block md:flex justify-center items-center" : "flex"
        }`}
      >
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={child.key || `column-${index}`}>
            {child}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};