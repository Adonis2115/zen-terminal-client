import Navbar from "./components/Navbar";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./Index";
import Orders from "./Orders";
import Positions from "./Positions";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
