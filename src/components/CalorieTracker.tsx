import { useMemo } from "react";
import { Activity } from "../types";
import Calorydisplay from "./Calorydisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  // Contadores
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, act) => (act.category === 1 ? total + act.calories : total),
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, act) => (act.category === 2 ? total + act.calories : total),
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center ">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <Calorydisplay
          calories={caloriesConsumed}
          text={"Consumidas"}
        />
        <Calorydisplay
          calories={caloriesBurned}
          text={"Quemadas"}
        />
        <Calorydisplay
          calories={netCalories}
          text={"Diferencia"}
        />
      </div>
    </>
  );
};

export default CalorieTracker;
