export const Columns = ({
  isStackedOnMobile,
  children,
  textColor,
  backgroundColor,
  customClasses,
}) => {

  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  return (
    <div
      className={`py-10 ${customClasses}`}
      style={{ ...textColorStyle, ...backgroundColorStyle }}
    >
      <div
        className={`max-w-5xl mx-auto ${
          isStackedOnMobile ? "block md:flex" : "flex"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
