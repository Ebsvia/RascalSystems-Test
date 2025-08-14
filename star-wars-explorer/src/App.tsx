import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ResourcePage from "./pages/ResourcePage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/people" />} />
        <Route path="/:resourceType" element={<ResourcePage />} />
        <Route path="/:resourceType/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
