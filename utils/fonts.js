export const getTextAlign = (textAlign = "left") => {
  const textAlignMap = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return `${textAlignMap[textAlign] || ""}`;
};

export const getFontSizeForHeading = (level) => {
  const fontSizeMap = {
    1: "text-6xl sm:text-4xl",
    2: "text-5xl sm:text-3xl",
    3: "text-4xl sm:text-2xl",
    4: "text-3xl sm:text-2xl",
    5: "text-2xl sm:text-xl",
    6: "text-xl  sm:text-xl",
  };

  return `${fontSizeMap[level] || ""}`;
};
