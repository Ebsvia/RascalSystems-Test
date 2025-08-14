import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getResource, type ResourceListResponse } from "../services/swapi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

interface ResourceListItem {
  name?: string;
  title?: string;
  url: string;
}

export default function ResourcePage() {
  const { resourceType } = useParams<{ resourceType: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [data, setData] = useState<ResourceListResponse<ResourceListItem> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resourceType) return;
    setLoading(true);
    setError(null);

    getResource<ResourceListItem>(resourceType, page)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data.");
        setLoading(false);
      });
  }, [resourceType, page]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{resourceType}</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.results.map((item) => {
          const idMatch = item.url.match(/\/(\d+)\/$/);
          const id = idMatch ? idMatch[1] : "";
          return (
            <Link
              key={item.url}
              to={`/${resourceType}/${id}`}
              className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              {item.name || item.title}
            </Link>
          );
        })}
      </div>

      <Pagination
        page={page}
        hasNext={!!data.next}
        hasPrevious={!!data.previous}
        onPageChange={(newPage) => setSearchParams({ page: String(newPage) })}
      />
    </div>
  );
}
