import logo from './logo.svg';
import './App.css';
import SignUp from './Feature/SignUp';
import Login from './Feature/Login';
import { Route, Routes } from 'react-router-dom';
import Quiz from './Feature/Quiz';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/signUp" element={<SignUp/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path='/Quiz'element={<Quiz/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
