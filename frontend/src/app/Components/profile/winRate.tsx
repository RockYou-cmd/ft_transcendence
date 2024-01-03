import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";


interface WinRateProps {
    progress: number;
    size?: number;
    color?: string;
}

const WinRate: React.FC<WinRateProps> = ({ progress, size = 100, color = 'red',}) => {
    return (
        <Card className="w-full h-full border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
          <CardBody className="w-full h-full justify-center items-center ">
            <CircularProgress
              classNames={{
                
                svg: "drop-shadow-md w-16 h-16",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}
              value={progress}
              strokeWidth={4}
              showValueLabel={true}
            />
          </CardBody>
        </Card>
      );
    };

export default WinRate;