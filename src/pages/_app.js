// import "../styles/globals.css";
import configureStores from "../../store/index";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const { store } = configureStores();

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
