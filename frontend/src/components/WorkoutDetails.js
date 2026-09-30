const WorkoutDetails = ({ workout, onWorkoutDeleted }) => {
  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      // Tell Home.js that this workout was deleted
      onWorkoutDeleted(json);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>

      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>

      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>

      <p>{workout.createdAt}</p>

      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
