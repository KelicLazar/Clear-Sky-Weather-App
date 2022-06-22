import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes.city}>{props.children}</div>;
};
