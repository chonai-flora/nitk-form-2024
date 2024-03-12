import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Form from "./components/Form";
import Done from "./components/Done";
import Closed from "./components/Closed";
import Dashboard from "./components/Dashboard";

const App = () => {
  const isPublic = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isPublic ? <Form /> : <Closed />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        {isPublic && (
          <>
            <Route path="/done/" element={<Done />} />
            <Route path="/dashboard/" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;