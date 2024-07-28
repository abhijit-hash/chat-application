import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import './App.css';
import Join from "./component/join/join";
import Chat from "./component/chat/chat";

function App() {

  return (
    <div className="App">
      
    <Router>
        <Routes>
        <Route exact path="/" Component={Join} />
        <Route path="/chat" Component={Chat} />
        </Routes>
    </Router>

    </div>
  );
}
export default App;