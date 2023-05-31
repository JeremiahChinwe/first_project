import './App.css'
import NotFound from './components/NotFound';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from './ParentComponents/Layout';
import Home from './components/Home';
import Host from './components/Host';
import Dashboard, { loader as dashboardLoader } from './components/Host/Dashboard';
import About from "./components/About"
import Vans, { loader as vansLoader } from './components/Vans/Vans';
import Income from './components/Host/Income';
import Review from './components/Host/Review';
import HostVans, { loader as hostVansLoader } from './components/Host/HostVans';
import HostVanDetail, { loader as hostVanDetailLoader } from './components/Host/HostVanDetail';
import VanDetail, { loader as vandetailLoader } from './components/Vans/VanDetail';
import HostVanInfo from "./components/Host/HostVanInfo"
import HostVanPricing from "./components/Host/HostVanPricing"
import HostVanPhotos from "./components/Host/HostVanPhotos"
import Error from './ParentComponents/Error';
import Login, { loader as loginLoader, action as loginAction } from './components/Login';
import Signup, { action as signUpAction, loader as signUpLoader } from './components/Signup';

import { AnimatePresence } from 'framer-motion';

function LocationProvider({ children }) {
  return <AnimatePresence>{children}</AnimatePresence>
}


const routeVariants = {
  initial: {
    x: '100%'
  },
  final: {
    x: '0%',
    transition: {
      type: 'spring',
      mass: 0.4,
      duration: 1
    }
  }
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="signup"
        element={<Signup routeVariants={routeVariants} />}
        loader={signUpLoader}
        action={signUpAction}
      />

      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home routeVariants={routeVariants} />}
        />
        <Route
          path="host"
          element={<Host routeVariants={routeVariants} />}
        />
        <Route
          path="about"
          element={<About routeVariants={routeVariants} />}
        />
        <Route
          path="vans"
          element={<Vans routeVariants={routeVariants} />}
          errorElement={<Error />}
          loader={vansLoader}
        />
        <Route
          path="vans/:id"
          element={<VanDetail routeVariants={routeVariants} />}
          errorElement={<Error />}
          loader={vandetailLoader}
        />
        <Route
          path="login"
          element={<Login routeVariants={routeVariants} />}
          loader={loginLoader}
          action={loginAction}
        />

        <Route path="host" element={<Host routeVariants={routeVariants} />}>
          <Route
            index
            element={<Dashboard routeVariants={routeVariants} />}
            errorElement={<Error />}
            loader={dashboardLoader}
          />
          <Route
            path="income"
            element={<Income routeVariants={routeVariants} />}
            errorElement={<Error />}
          />
          <Route
            path="review"
            element={<Review routeVariants={routeVariants} />}
            errorElement={<Error />}
          />
          <Route
            path="vans"
            element={<HostVans routeVariants={routeVariants} />}
            errorElement={<Error />}
            loader={hostVansLoader}
          />
          <Route
            path='vans/:id'
            element={<HostVanDetail routeVariants={routeVariants} />}
            errorElement={<Error />}
            loader={hostVanDetailLoader}
          >
            <Route
              index
              element={<HostVanInfo routeVariants={routeVariants} />}
            />
            <Route
              path="pricing"
              element={<HostVanPricing routeVariants={routeVariants} />}
            />
            <Route
              path="photos"
              element={<HostVanPhotos routeVariants={routeVariants} />}
            />
          </Route>
        </Route>

        <Route 
        path="*" 
        element={<NotFound routeVariants={routeVariants} />}/>      
        </Route>
    </>
  )
)







function App() {
  return (
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  );
}

export default App;
