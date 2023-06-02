import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/Routes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Layout from "./components/layout/Layout";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route: any, index: number) => {
          return (
            <Route key={index} path={route.path} element={route.component} />
          );
        })}
        <Route element={<PrivateRoutes />}>
          {privateRoutes.map((route: any, index: number) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Layout>{route.component}</Layout>}
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
