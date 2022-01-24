import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Drawing from "./components/Drawing";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { getSessionValues, UserContext } from "./utility";

function App() {
  const { id: currentUserId } = getSessionValues();
  const [userId, setUserId] = useState(currentUserId || '');
  const value = { userId, setUserId };

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login setUserId={(id) => !userId && setUserId(id)} />} />
            <Route path="/signup" element={<SignUp setUserId={(id) => !userId && setUserId(id)} />} />
            <Route path="/drawing" element={currentUserId || userId ? <Drawing /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
