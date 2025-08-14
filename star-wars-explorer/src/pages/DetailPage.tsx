import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getResourceDetail } from "../services/swapi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function DetailPage() {
  const { resourceType, id } = useParams<{ resourceType: string; id: string }>();

  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resourceType || !id) return;
    setLoading(true);
    setError(null);

    getResourceDetail<Record<string, any>>(resourceType, id)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load details.");
        setLoading(false);
      });
  }, [resourceType, id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to={`/${resourceType}`} className="text-blue-400 underline mb-4 inline-block">
        ← Back to {resourceType}
      </Link>
      <h1 className="text-3xl font-bold mb-4">{data.name || data.title}</h1>
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b border-gray-700 py-1">
            <span className="capitalize">{key.replace(/_/g, " ")}</span>
            <span className="text-gray-300">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
