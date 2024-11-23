import { useRestaurantStore } from "@/store/restaurantStore"
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { TRestaurant } from "@/types/restaurantType";
import RestaurantCards from "../RestaurantCards";
import HeroSection from "./HeroSection"
import FilterPage from "../FilterPage";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedRestaurant, setSearchedRestaurant] = useState<TRestaurant[]>([]);
  const [restaurants, setRestaurants] = useState<TRestaurant[]>([]);
  const {appliedFilter, getSearchedRestaurant, getAllRestaurant, loading} = useRestaurantStore();

  const handleSearchedRestaurants = async() => {
    if (searchQuery) {
      const restaurant = await getSearchedRestaurant(searchQuery);
      setSearchedRestaurant(restaurant);
    }
  }
  
  useEffect(() => {
    const getRestaurants = async() => {
      const restaurants = await getAllRestaurant();
      setRestaurants(restaurants);
    }
    getRestaurants();
  }, [])

  useEffect(() => {
    if (appliedFilter?.length > 0) {
      const getRestaurantsByMenu = async() => {
        const restaurant = await getSearchedRestaurant();
        setSearchedRestaurant(restaurant);
      }
      getRestaurantsByMenu();
    }else {
      setSearchedRestaurant([]);
    }
  }, [appliedFilter])
      
  return (
    <div>
      <HeroSection/>
      <div className="flex gap-5">
        <FilterPage/>
        <div className="flex flex-col gap-4">
          {/* search input */}
          <div className="flex items-center gap-2 relative">
            {appliedFilter?.length > 0 ? (
              <div className="text-3xl font-bold">
                <span>{searchedRestaurant?.length}</span> <span> {searchedRestaurant?.length > 1 ? "Restaurants" : "Restaurant"} found</span>
              </div>
            ):
            (
              <>
                <Input
                  type="text"
                  value={searchQuery}
                  placeholder="Search for restaurants, cuisines, dishes"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 shadow-lg"
                  />
                <Search 
                  className="text-gray-500 absolute inset-y-2 left-2 cursor-pointer"
                  onClick={handleSearchedRestaurants}
                />
              { searchQuery && (
                <X size={20} className="absolute right-24 cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchedRestaurant([]);
                    useRestaurantStore.setState({ appliedFilter: [] });
                  }}
                />
              )}
              <Button
                onClick={handleSearchedRestaurants}
                className="bg-orange hover:bg-hoverOrange"
              >
                Search
              </Button>
              </>
            )}
          </div>
          { searchedRestaurant && searchedRestaurant?.length > 0 ? (
            <RestaurantCards restaurants={searchedRestaurant} loading={loading}/> 
          ): (
            <RestaurantCards restaurants={restaurants} loading={loading}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage