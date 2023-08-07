import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = (props) => {
	return (
		<div className="not-found">
			<h1>{props.message}</h1>
			<Link to="/">Go back to homepage</Link>
		</div>
	);
};

export default NotFound;
