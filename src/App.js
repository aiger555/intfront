import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Login from "./auth/Login"; // Import Login component
import Register from "./auth/Register"; // Import Register component
import AddJournal from "./journals/AddJournal";
import EditJournal from "./journals/EditJournal";
import ViewJournal from "./journals/ViewJournal";
import JournalImageManager from "./journals/JournalImageManager"; // Import JournalImageManager component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          {/* Home page */}
          <Route exact path="/" element={<Home />} />

          {/* Add Journal page */}
          <Route exact path="/addjournal" element={<AddJournal />} />
          
          {/* Edit Journal page */}
          <Route exact path="/editjournal/:id" element={<EditJournal />} />
          
          {/* View Journal page */}
          <Route exact path="/viewjournal/:id" element={<ViewJournal />} />
          
          {/* Journal Image Management page */}
          <Route exact path="/journal/:journalId/manage-image" element={<JournalImageManager />} />
          
          {/* Login page */}
          <Route exact path="/login" element={<Login />} />
          
          {/* Register page */}
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
