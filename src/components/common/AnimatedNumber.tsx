import CountUp from "react-countup";

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  return (
    <CountUp end={value} duration={0.2} enableScrollSpy scrollSpyOnce />
  );
};

export default AnimatedNumber;