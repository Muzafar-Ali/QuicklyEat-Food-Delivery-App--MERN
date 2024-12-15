import { useUserStore } from "@/store/userStore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const AddRemoveFavourite = ({ restaurantId }: { restaurantId: string }) => {
  const { addFavourite, getFavouriteList, removeFavourite } = useUserStore();
  const [favourites, setFavourites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true); // Show loading state
        const favs = await getFavouriteList(); // Call getFavourites to get the list
        setFavourites(favs); // Set the favourites to local state
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchFavourites();
  }, [getFavouriteList]); // Only re-run when getFavourites function changes

  const isFavourite = favourites.includes(restaurantId); // Check if the restaurant is in the favourites list

  // Add a restaurant to favourites
  const handleAddFavourite = async () => {
    if (loading) return; // Prevent adding a favorite if it's loading
    try {
      await addFavourite(restaurantId); 
      setFavourites((prevFavourites) => [...prevFavourites, restaurantId]);
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  // Remove a restaurant from favourites
  const handleRemoveFavourite = async () => {
    if (loading) return; // Prevent removing a favorite if it's loading
    try {
      await removeFavourite(restaurantId);
      setFavourites((prevFavourites) => prevFavourites.filter(id => id !== restaurantId));
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  };

  return (
    <div>
      <Heart
        size={30} 
        color="white"
        className={`cursor-pointer ${isFavourite ? 'fill-red-500' : 'fill-gray-500'}`}
        onClick={isFavourite ? handleRemoveFavourite : handleAddFavourite}
      />
    </div>
  );
};

export default AddRemoveFavourite;
