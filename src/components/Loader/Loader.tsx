import { FidgetSpinner } from "react-loader-spinner";
import "./Loader.module.scss";

const Loader = () => {
  return (
    <div className="overlay">
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
        ballColors={["#01b4e4", "#90cea1", "#ffffff"]}
        backgroundColor="#0d253f"
      />
    </div>
  );
};

export default Loader;
