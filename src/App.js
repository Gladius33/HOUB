import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import EmployerDashboard from './components/dashboard/EmployerDashboard';
import FreelancerDashboard from './components/dashboard/FreelancerDashboard';
import CreateJob from './components/jobs/CreateJob';
import JobList from './components/jobs/JobList';
import JobDetails from './components/jobs/JobDetails';
import Chat from './components/chat/Chat';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Home} />
      <section className="container">
        <ToastContainer />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/employer-dashboard' component={EmployerDashboard} />
          <PrivateRoute exact path='/freelancer-dashboard' component={FreelancerDashboard} />
          <PrivateRoute exact path='/create-job' component={CreateJob} />
          <PrivateRoute exact path='/jobs' component={JobList} />
          <PrivateRoute exact path='/jobs/:id' component={JobDetails} />
          <PrivateRoute exact path='/chat' component={Chat} />
          <PrivateRoute exact path='/profile' component={Profile} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;

