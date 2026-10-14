import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DishDetailPage() {
  const { id } = useParams();
  const { data: dishes, isLoading, error } = useFetch(`${import.meta.env.VITE_API_URL}/menu`);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Could not load dish: {error}</p>;

  const dish = (dishes || []).find((d) => String(d.id) === id);
  if (!dish) return <p>Dish not found.</p>;

  return (
    <div>
      <h2>{dish.name}</h2>
      <p>Rs. {dish.price.toFixed(2)}</p>
      <p>Category: {dish.category}</p>
      <p>{dish.available ? "Available" : "Sold out"}</p>
      <Link to="/">← Back to menu</Link>
    </div>
  );
}
export default DishDetailPage;
