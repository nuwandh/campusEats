import MenuList from "../components/MenuList";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";


// const SAMPLE = [
//  { id: 1, name: "Kottu Roti", price: 750, category: "Mains", available: true },
//  { id: 2, name: "Fried Rice", price: 850, category: "Mains", available: true },
//  { id: 3, name: "Veg Sub", price: 600, category: "Snacks", available: false },
//  { id: 4, name: "Watalappan", price: 350, category: "Dessert",available: true },
//  { id: 5, name: "Iced Milo", price: 300, category: "Drinks", available: true },
// ];

function MenuPage() {
    const [query, setQuery] = useState("");
 const debounced = useDebounce(query, 400);
const { data: dishes, isLoading, error } = useFetch(`${import.meta.env.VITE_API_URL}/menu`);

if (isLoading) return <p>Loading menu…</p>;
if (error) return <p>Could not load menu: {Error}</p>;
const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );


 
 return (
 <div>
 <input
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Search dishes..."
 />
 <MenuList dishes={filtered} />
 </div>
 );

}

export default MenuPage;

