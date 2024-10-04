type CaloryDisplayProps = {
  calories: number;
  text: string;
};

const Calorydisplay = ({ calories, text }: CaloryDisplayProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange">{calories}</span>
      {text}
    </p>
  );
};

export default Calorydisplay;
