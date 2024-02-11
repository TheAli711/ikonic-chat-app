import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Chats from "./pages/chats";
import React from "react";
import { getProfile } from "./services/auth";
import { AppContext } from "./AppContext";

function App() {
  const [user, setUser] = React.useState(null);
  const [authCheck, setAuthCheck] = React.useState(true);

  React.useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setAuthCheck(false);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuthCheck(false);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: !user ? <Home /> : <Navigate to={"/chats"} replace />,
    },
    {
      path: "/chats",
      element: user ? <Chats /> : <Navigate to={"/"} replace />,
    },
  ]);

  return (
    <div className="App">
      <AppContext.Provider value={{ user, setUser }}>
        {!authCheck && <RouterProvider router={router} />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
