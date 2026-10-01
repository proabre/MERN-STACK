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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || "Failed to fetch workouts");
        }

        setWorkouts(json);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts((currentWorkouts) => [newWorkout, ...currentWorkouts]);
  };

  const handleWorkoutDeleted = (deletedWorkout) => {
    setWorkouts((currentWorkouts) =>
      currentWorkouts.filter((workout) => workout._id !== deletedWorkout._id),
    );
  };

  return (
    <div className="home">
      <div className="workouts">
        {loading && <p>Loading workouts...</p>}

        {error && <div className="error">{error}</div>}

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
