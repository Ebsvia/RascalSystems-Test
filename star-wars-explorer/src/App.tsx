import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css';
import ResourcePage from "./pages/ResourcePage";
import DetailPage from "./pages/DetailPage";

// If you have a separate DetailPageWrapper component, import it like this:
// import DetailPageWrapper from "./pages/DetailPageWrapper";

// Otherwise, define it here as a wrapper for DetailPage:
import { useParams } from "react-router-dom";

function DetailPageWrapper() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null; // or handle missing id appropriately
  return <DetailPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/people" />} />
          <Route path="/:resourceType" element={<ResourcePage />} />
          <Route
            path="/:resourceType/:id"
            element={<DetailPageWrapper />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}