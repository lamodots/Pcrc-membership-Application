import { Oval } from "react-loader-spinner";

function FallbackLoadingComponent() {
  return (
    <div>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperClass="w-screen h-screen items-center justify-center"
      />
    </div>
  );
}

export default FallbackLoadingComponent;
