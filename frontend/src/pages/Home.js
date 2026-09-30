/*
import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
*/

import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);

  // Add new workout to the list
  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts((currentWorkouts) => [newWorkout, ...currentWorkouts]);
  };

  // Remove deleted workout from the list
  const handleWorkoutDeleted = (deletedWorkout) => {
    setWorkouts((currentWorkouts) =>
      currentWorkouts.filter((workout) => workout._id !== deletedWorkout._id),
    );
  };

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              workout={workout}
              onWorkoutDeleted={handleWorkoutDeleted}
              key={workout._id}
            />
          ))}
      </div>

      <WorkoutForm onWorkoutAdded={handleWorkoutAdded} />
    </div>
  );
};

export default Home;
