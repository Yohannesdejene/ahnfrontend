import React from "react";
import { CiCircleInfo } from "react-icons/ci"; // Assuming you're using react-icons
interface TooltipProps {
  text: string;
}
const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Tooltip Content */}
      <span
        style={{
          position: "absolute",
          backgroundColor: "#1f2937",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "4px 8px",
          borderRadius: "4px",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
          whiteSpace: "nowrap",
          visibility: "hidden",
          opacity: 0,
          transition: "opacity 0.2s",
          zIndex: 10,
        }}
        className="tooltip"
      >
        {text}
        {/* Arrow */}
        <span
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            borderTop: "6px solid #1f2937",
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </span>
      <div
        onMouseEnter={(e: any) => {
          const tooltip = e.currentTarget.previousSibling;
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = 1;
        }}
        onMouseLeave={(e: any) => {
          const tooltip = e.currentTarget.previousSibling;
          tooltip.style.visibility = "hidden";
          tooltip.style.opacity = 0;
        }}
      >
        {/* {text} */}
      </div>
      {/* Icon */}
    </div>
  );
};

export default Tooltip;
