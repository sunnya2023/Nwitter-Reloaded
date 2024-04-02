import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import CreateAccount from "./routes/CreateAccount";
import Login from "./routes/Login";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./Firebase";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset}
  html{
    font-size:10px;
  }
  *{
    box-sizing: border-box;
   
  }
body{
  background-color: #6B63FF;
}
a{
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
ul,li{
  list-style: none;
}
button{
  border: none;
outline: none;
  cursor: pointer;
}
input{
  border: none;
  outline: none;
  color: inherit;
}
`;
function App() {
  const [loading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyles />
      {loading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
