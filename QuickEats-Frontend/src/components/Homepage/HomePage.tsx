import { useRestaurantStore } from "@/store/restaurantStore"
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TRestaurant } from "@/types/restaurantType";
import RestaurantCards from "../RestaurantCards";
import HeroSection from "./HeroSection"
import FilterPage from "../FilterPage";
import config from "@/config/config";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restaurants, setRestaurants] = useState<TRestaurant[]>([])
  const [searchedRestaurant, setSearchedRestaurant] = useState<TRestaurant[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const {appliedFilter} = useRestaurantStore();

  // Function to fetch restaurants based on search query
  const getRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${config.baseUri}/api/v1/restaurant/search/?searchQuery=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setSearchedRestaurant(data.restaurants);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if ( appliedFilter?.length > 0 ) {

      const params = new URLSearchParams();
      params.set("cuisines", appliedFilter?.join(","));

      const getRestaurantsBySelectedCuisines = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${config.baseUri}/api/v1/restaurant/search/?${params.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await response.json();
          setSearchedRestaurant(data.restaurants);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      getRestaurantsBySelectedCuisines();
    
    } else {
      setSearchedRestaurant([]);
    }
  }, [appliedFilter])
  
  // fetch all restauranst
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.baseUri}/api/v1/restaurant/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        setRestaurants(data.restaurants);
        setLoading(false);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRestaurants();
    
  }, []);
    
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
                  onClick={() => getRestaurants()}
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
                onClick={() => getRestaurants()}
                className="bg-orange hover:bg-hoverOrange"
              >
                Search
              </Button>
              </>
            )}
          </div>
          { searchedRestaurant && searchedRestaurant?.length > 0 ?(
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