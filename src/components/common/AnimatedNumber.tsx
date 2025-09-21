import CountUp from "react-countup";

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  return (
    <CountUp end={value} duration={2.75} enableScrollSpy scrollSpyOnce />
  );
};

export default AnimatedNumber;