import MyRoute from "./MyRoute";
import store from "./store";
import { Provider } from "react-redux";
// REACT_APP_API_URL=https://e-commerce-api123.herokuapp.com/api

const App = () => {
  return (
    <>
      <Provider store={store}>
        <MyRoute />
      </Provider>

    </>
  );
}

export default App;
