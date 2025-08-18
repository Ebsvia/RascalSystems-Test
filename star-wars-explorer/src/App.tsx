import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css';
import ResourcePage from "./pages/ResourcePage";
import DetailPage from "./pages/DetailPage";
import LandingPage from "./pages/LandingPage";
import { useParams } from "react-router-dom";

function DetailPageWrapper() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return <DetailPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container bg-black mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:resourceType" element={<ResourcePage />} />
          <Route path="/:resourceType/:id" element={<DetailPageWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
