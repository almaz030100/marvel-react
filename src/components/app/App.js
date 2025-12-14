import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from "../pages/404";
import SingleComicPage from "../pages/SingleComicPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader/>
        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route exact path="/comics">
            <ComicsPage/>
          </Route>
          <Route exact path="/comics/:id">
            <SingleComicPage/>
          </Route>
          <Route path="*">
            <Page404/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;