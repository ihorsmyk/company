import { Triangle } from "react-loader-spinner";
import "./Loader.scss";

const Loader: React.FC = () => {
  return (
    <div className="overlay">
      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
