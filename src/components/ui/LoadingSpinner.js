import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.centered}>
      <div className={classes.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
