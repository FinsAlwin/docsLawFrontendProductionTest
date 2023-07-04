import React from "react";
import { Routes, Route } from "react-router-dom";
import Analytics from "layouts/dashboards/analytics";
// Import other dashboard components

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboards" element={<Analytics />} />
      {/* Add more routes for your dashboard */}
    </Routes>
  );
};

export default DashboardRoutes;
