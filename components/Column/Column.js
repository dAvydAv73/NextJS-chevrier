"use client"
import { useInView } from "react-intersection-observer";

export const Column = ({ children, width, textColor, backgroundColor, index = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  const widthStyle = width
    ? { minWidth: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };
  return (
    <div
      ref={ref}
      style={{
        transform: inView ?  "none" : "translateY(200px)",
        opacity: inView ? 1 : 0,
        transition: `all 0.5s ease-in ${index * 0.3}s`,
        ...widthStyle,
        ...textColorStyle,
        ...backgroundColorStyle }}
      className="px-2 py-5"
    >
      {children}
    </div>
  );
};
