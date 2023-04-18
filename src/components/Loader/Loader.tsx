import { Triangle } from "react-loader-spinner";
import "./Loader.scss";

const Loader: React.FC = () => {
  return (
    <div className="overlay">
      <Triangle
        height="80"
        width="80"
        color="#007bff"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
