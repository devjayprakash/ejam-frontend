import { Card } from "antd";
import React from "react";

interface CountDownCardProps {
  countdown: number;
}

const CountDownCard: React.SFC<CountDownCardProps> = ({ countdown }) => {
  return (
    <Card className={"h-56 flex justify-center items-center text-3xl mt-3"}>
      {countdown}
    </Card>
  );
};
export default CountDownCard;
