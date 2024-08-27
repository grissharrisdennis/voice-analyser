import './App.css';
import FileUpload from './components/FileUpload.js';
import Homepage from './components/Triggerlogin.js'
import { Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';
import navbar from "./components/Navbar.js"
import Register from './pages/Registerpage.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Homepage/>
        <Routes>
        <Route path='/' component={Homepage} />
        <Route path='/register' component={Register} />
    </Routes>
      </header>
    </div>
  );
}

export default App;
