import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/layout/Navbar.js';
import Home from './components/pages/Home.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Dashboard from './components/dashboard/Dashboard.js';
import EmployerDashboard from './components/dashboard/EmployerDashboard.js';
import FreelancerDashboard from './components/dashboard/FreelancerDashboard.js';
import CreateJob from './components/jobs/CreateJob.js';
import JobList from './components/jobs/JobList.js';
import JobDetails from './components/jobs/JobDetails.js';
import Chat from './components/chat/Chat.js';
import Profile from './components/profile/Profile.js';
import PrivateRoute from './components/routing/PrivateRoute.js';
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route exact path="/employer-dashboard" element={<PrivateRoute component={EmployerDashboard} />} />
        <Route exact path="/freelancer-dashboard" element={<PrivateRoute component={FreelancerDashboard} />} />
        <Route exact path="/create-job" element={<PrivateRoute component={CreateJob} />} />
        <Route exact path="/jobs" element={<PrivateRoute component={JobList} />} />
        <Route exact path="/jobs/:id" element={<PrivateRoute component={JobDetails} />} />
        <Route exact path="/chat" element={<PrivateRoute component={Chat} />} />
        <Route exact path="/profile" element={<PrivateRoute component={Profile} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
