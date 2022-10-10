import './App.css';
import Home from "./pages/Home";
import Products from "./pages/Products";
import Employees from "./pages/Employees";
import Sales from "./pages/Sales";
import { ContextProvider } from './context/ContextProvider';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Employees/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/sales" element={<Sales/>}/>
        </Routes>
      </ContextProvider>
  );  
}

export default App;
