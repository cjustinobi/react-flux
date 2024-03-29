import React from 'react';
import HomePage from './HomePage';
import CoursesPage from './CoursesPage';
import AuthorsPage from './AuthorsPage';
import AboutPage from './AboutPage';
import Header from './Common/Header';
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import ManageCoursePage from "./ManageCoursePage";
import ManageAuthorPage from "./ManageAuthorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <div className="container-fluid">
        <ToastContainer autoClose={3000} hideProgressBar />
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/authors" component={AuthorsPage}/>
          <Route path="/about" component={AboutPage} />
          <Route path="/course/:slug" component={ManageCoursePage} />
          <Route path="/course" component={ManageCoursePage} />
          <Route path="/author" component={ManageAuthorPage} />
          <Route path="/author/:id" component={ManageAuthorPage} />
          <Redirect from="/about-page" to="about" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
  );
}

export default App;
