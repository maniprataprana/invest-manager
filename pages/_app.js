import { ToastContainer } from "react-toastify";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
// import ToastMessage from "@/components/toast";
// import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   ToastMessage({ type: "success", message: "Hello world!" });
  // }, []);
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
