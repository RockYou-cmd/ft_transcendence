import { CircularProgress, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";


interface WinRateProps {
  progress: number;
}

const WinRate: React.FC<WinRateProps> = ({ progress }) => {
  return (
    <>
<svg width="200" height="200">
  <g transform="rotate(-90 100 100)">
    <circle r="70" cx="100" cy="100" fill="transparent"  stroke="lightgrey" stroke-width="1.5rem" stroke-dasharray="439.8" stroke-dashoffset="0"></circle>
    <circle r="70" cx="100" cy="100" fill="transparent"  stroke="blue" stroke-width="1.5rem" stroke-dasharray="439.8" stroke-dashoffset="66"> 
    </circle>
  </g>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">85%</text>
</svg>    </>
)}

export default WinRate;