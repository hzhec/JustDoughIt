import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
	return (
		<div className="not-found">
			<h1>Error 404 - Page Not Found!</h1>
			<Link to="/">Go back to homepage</Link>
		</div>
	);
};

export default NotFound;
