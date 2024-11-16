import { useRestaurantStore } from "@/store/restaurantStore"
import RestaurantCards from "../RestaurantCards";
import HeroSection from "./HeroSection"
import { useEffect } from "react";

const HomePage = () => {
  const { allRestaurant, loading, getAllRestaurant } = useRestaurantStore();

  useEffect(() => {
    getAllRestaurant();
  }, [])
  
  return (
    <div>
      <HeroSection/>
      <RestaurantCards restaurants={allRestaurant} loading={loading}/>
    </div>
  )
}

export default HomePage