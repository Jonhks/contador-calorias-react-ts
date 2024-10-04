import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActitivtyActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidv4 } from "uuid";
type FormProps = {
  dispatch: Dispatch<ActitivtyActions>;
  state: ActivityState;
};

const Form = ({ dispatch, state }: FormProps) => {
  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectActiveId = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectActiveId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeId]);

  const handleOnChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "save-activity",
      payload: { newActivity: activity },
    });
    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="category"
          className="font-bold"
        >
          Categoria:
        </label>
        <select
          name="category"
          id="category"
          className="border border-stone-300 p-2 rounded-lg wfull bg-white"
          value={activity.category}
          onChange={handleOnChange}
        >
          {categories.map((category) => (
            <option
              value={category.id}
              key={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="name"
          className="font-bold"
        >
          Actividad:
        </label>
        <input
          id="name"
          type="text "
          className="border border-slate-300 p-2 rounded-lg wfull bg-white"
          placeholder="Ej. Comida: jugo de naranja, Ensalada. Ejercicio: Pesas, Bicicleta"
          value={activity.name}
          onChange={handleOnChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="calories"
          className="font-bold"
        >
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg wfull bg-white"
          placeholder="Calorias.  Ej: 300 o 500"
          value={activity.calories}
          onChange={handleOnChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;
