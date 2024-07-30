import React, { SVGProps } from "react";


// Define the interface
interface IconProps extends SVGProps<SVGSVGElement> {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
}



export const BasketballScoreIcon: React.FC<IconProps> = ({
  fill = "currentColor",
  size = 24,
  height,
  width,
  ...props
}) => (
  <svg
    fill={fill}
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Scoreboard */}
    <rect x="2" y="7" width="20" height="10" rx="2" fill="black" />
    <text
      x="12"
      y="14"
      fill="white"
      fontSize="8"
      fontFamily="Arial"
      textAnchor="middle"
    >
      88:92
    </text>
  </svg>
);


