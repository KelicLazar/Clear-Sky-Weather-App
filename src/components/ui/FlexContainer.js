import classes from "./FlexContainer.module.css";

const FlexContainer = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default FlexContainer;
