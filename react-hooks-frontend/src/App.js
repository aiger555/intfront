import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import JournalList from './components/JournalList';
import Logout from './components/Logout';

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Simple check for authToken

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        
        {/* Add a route for individual journal pages */}
        <Route path="/journals/:id" component={JournalPage} />

        {/* Protect routes requiring authentication */}
        <Route 
          path="/journals" 
          render={() => isAuthenticated ? <JournalList /> : <Redirect to="/login" />}
        />
        
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        {/* Handle logout */}
        <Route path="/logout" component={Logout} />
        
        {/* Optionally, you could add a default route */}
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

export default App;
