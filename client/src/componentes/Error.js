import { Link } from "react-router-dom";
import "../styles/error.css";

export default function Error() {
  return (
    <div className="error">
      <span className="letrasE">PAGE NOT FOUND</span>
      <div className="btn_back">
        <Link to="/home" className="linkE">
          <button className="btn_back">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
