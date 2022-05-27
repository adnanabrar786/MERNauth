import './App.css';
import Router from './routes/Router';
import axios from 'axios';
import { AuthContextProvider } from './context/AuthContext';


// use acess token readable for Login users
axios.defaults.withCredentials = true;

function App() {
  return ( 
    <div className="App">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
