import { useEffect, useState } from "react";

const WorkoutDetails = ({ workout, onWorkoutDeleted }) => {
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) {
      return "just now";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);

    return `${months} month${months !== 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    // Set the initial time
    setTimeAgo(formatTimeAgo(workout.createdAt));

    // Update every minute
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(workout.createdAt));
    }, 60000);

    // Cleanup when component is removed
    return () => clearInterval(interval);
  }, [workout.createdAt]);

  const handleClick = async () => {
    setDeleting(true);
    setError(null);

    try {
      const response = await fetch("/api/workouts/" + workout._id, {
        method: "DELETE",
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to delete workout");
      }

      onWorkoutDeleted(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(false);
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

      <p>{timeAgo}</p>

      <button onClick={handleClick} disabled={deleting}>
        {deleting ? "Deleting..." : "Delete"}
      </button>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WorkoutDetails;
