import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Wardrobe from "../pages/Wardrobe";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/outfit-organizer" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="upload" element={<Upload />} />
            <Route path="wardrobe" element={<Wardrobe />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Home from "../pages/Home";
// import Upload from "../pages/Upload";
// import Wardrobe from "../pages/Wardrobe";
// import Login from "../pages/Login";
// import ProtectedRoute from "../components/ProtectedRoute";

// function AppRoutes() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         {/* Protect all other routes */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <Upload />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/wardrobe"
//           element={
//             <ProtectedRoute>
//               <Wardrobe />
//             </ProtectedRoute>
//           }
//         />

//         {/* Redirect any unknown routes to login */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default AppRoutes;
