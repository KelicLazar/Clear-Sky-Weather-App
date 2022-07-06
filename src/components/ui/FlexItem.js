import classes from "./FlexItem.module.css";

const FlexItem = (props) => {
  return <div className={classes.item}>{props.children}</div>;
};

export default FlexItem;
