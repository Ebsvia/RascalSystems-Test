import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPersonWithHomeworld } from "../services/swapi";
import type { PersonWithHomeworld } from "../services/swapi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function PersonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PersonWithHomeworld | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetchPersonWithHomeworld(id)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load person details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8 w-full max-w-6xl">
        
        {/* Left - Image Placeholder */}
        <div className="bg-gray-700 flex items-center justify-center h-64 lg:h-full">
          <span className="text-gray-400 italic">No image available</span>
        </div>

        {/* Right - Details */}
        <div className="p-8 flex flex-col justify-center space-y-8">
          <h1 className="text-4xl font-bold border-b border-gray-700 pb-3">
            {data.name}
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <Detail label="Height" value={`${data.height} cm`} />
            <Detail label="Mass" value={`${data.mass} kg`} />
            <Detail label="Hair Color" value={data.hair_color} />
            <Detail label="Skin Color" value={data.skin_color} />
            <Detail label="Eye Color" value={data.eye_color} />
            <Detail label="Birth Year" value={data.birth_year} />
            <Detail label="Gender" value={data.gender} />
          </div>

          {/* Homeworld */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Homeworld</h2>
            <div className="bg-gray-700 rounded-lg p-5 space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {data.homeworld.name}
              </p>
              {data.homeworld.climate && (
                <p>
                  <span className="font-semibold">Climate:</span> {data.homeworld.climate}
                </p>
              )}
              {data.homeworld.population && (
                <p>
                  <span className="font-semibold">Population:</span> {data.homeworld.population}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-400 block text-sm">{label}</span>
      <span className="text-xl font-medium">{value}</span>
    </div>
  );
}
