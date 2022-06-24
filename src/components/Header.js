import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="backgroundImage">
      <Link to="/">
        <h1>Clear Sky Weather App</h1>
      </Link>
      {props.children}
    </div>
  );
};

export default Header;
