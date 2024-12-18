import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListUsersComponent from './components/ListUsersComponent';
import ListJournalsComponent from './components/ListJournalsComponent';
import AddUserComponent from './components/AddUserComponent';
import AddJournalComponent from './components/AddJournalComponent';
import EditUserComponent from './components/EditUserComponent';
import EditJournalComponent from './components/EditJournalComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            {/* Home route */}
            <Route exact path="/" component={ListUsersComponent}></Route>
            
            {/* User routes */}
            <Route path="/users" component={ListUsersComponent}></Route>
            <Route path="/add-user" component={AddUserComponent}></Route>
            <Route path="/edit-user/:id" component={EditUserComponent}></Route>
            
            {/* Journal routes */}
            <Route path="/journals" component={ListJournalsComponent}></Route>
            <Route path="/add-journal" component={AddJournalComponent}></Route>
            <Route path="/edit-journal/:id" component={EditJournalComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
