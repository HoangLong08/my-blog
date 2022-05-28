import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "routes/index";
import DefaultLayout from "layouts/DefaultLayout/index";
import LayoutAdmin from "layouts/LayoutAdmin/index";
import LayoutProfile from "pages/ProfilePage/index";
import './App.less';

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = DefaultLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout path={route.path} isFooter={route.isFooter} isHeader={route.isHeader}>
                  {route.isLayoutProfile === 1 ? (
                    <LayoutProfile>
                      <Page />
                    </LayoutProfile>
                  ) :
                    <Page />
                  }
                </Layout>
              }
            />
          )
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component !== null ? route.component : route.page;
          const Layout = LayoutAdmin;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.component !== null ? (
                  <Layout path={route.path}> <Page />  </Layout>
                ) : <Page />
              }
            />
          )
        })}
      </Routes>
    </Router>
  );
}

export default App;
