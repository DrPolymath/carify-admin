// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import { createTheme, ThemeProvider } from "@material-ui/core";
import CarList from "./components/car/CarList";
import Manage from "./components/manage/Manage";
import Log from "./components/log/Log";
import Profile from "./components/profile/Profile";
import Admin from "./components/manage/admin/Admin";
import CarBrand from "./components/manage/carBrand/CarBrand";
import PriceRange from "./components/manage/priceRange/PriceRange";
import BodyType from "./components/manage/bodyType/BodyType";
import CarModel from "./components/manage/carModel/CarModel";
import CarVariant from "./components/manage/carVariant/CarVariant";
import { blue } from "@material-ui/core/colors";
import { yellow } from "@material-ui/core/colors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarDetail from "./components/car/CarDetail";
import SignUp from "./components/auth/SignUp"

// Customizing UI component
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: yellow,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/carlist">
            <CarList />
          </Route>
          <Route exact path="/manage">
            <Manage />
          </Route>
          <Route path="/log">
            <Log />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/manage/admin">
            <Admin />
          </Route>
          <Route path="/manage/carbrand">
            <CarBrand />
          </Route>
          <Route path="/manage/pricerange">
            <PriceRange />
          </Route>
          <Route path="/manage/bodytype">
            <BodyType />
          </Route>
          <Route path="/manage/carmodel">
            <CarModel />
          </Route>
          <Route path="/manage/carvariant">
            <CarVariant />
          </Route>
          <Route path="/cardetail/:cmId/:vId" component={CarDetail}/>//car model's id
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
