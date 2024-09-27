import React from "react";


export const Columns = ({
  isStackedOnMobile,
  children,
  textColor,
  backgroundColor,
  customClasses,
}) => {

  return (
    <div
      className={`py-10 ${customClasses}`}
      style={{ color: textColor, backgroundColor }}
    >
      <div
        className={`max-w-5xl mx-auto ${
          isStackedOnMobile ? "block md:flex" : "flex"
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