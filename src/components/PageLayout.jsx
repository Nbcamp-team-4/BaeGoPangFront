import React from "react";
import { G } from "./UI";
import { PAGE_MAX_WIDTH, PAGE_SIDE_PADDING } from "../constants/layout";

export default function PageLayout({ children, contentStyle = {} }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f6f8",
        padding: `${PAGE_SIDE_PADDING}px`,
      }}
    >
      <div
        style={{
          maxWidth: `${PAGE_MAX_WIDTH}px`,
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
          border: `1px solid ${G?.[100] ?? "#eee"}`,
        }}
      >
        <div
          style={{
            padding: "24px",
            ...contentStyle,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}