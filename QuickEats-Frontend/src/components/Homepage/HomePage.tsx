import { useRestaurantStore } from "@/store/restaurantStore"
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { TRestaurant } from "@/types/restaurantType";
import RestaurantCards from "../RestaurantCards";
import HeroSection from "./HeroSection"
import FilterPage from "../FilterPage";
import DishSlider from "./DishSlider";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedRestaurant, setSearchedRestaurant] = useState<TRestaurant[]>([]);
  const [restaurants, setRestaurants] = useState<TRestaurant[]>([]);
  const {appliedFilter, getSearchedRestaurant, getAllRestaurant, removeAppliedFilter, manageAppliedFilter, loading} = useRestaurantStore();

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
      {/* <HeroSection/> */}
      <div className="flex gap-14 w-full mt-20 h-screen relative">
        <FilterPage/>
        <div className="flex flex-col gap-4 w-full lg:ml-[300px]">
          { appliedFilter.length > 0 && (
            <div className="text-start flex flex-col lg:flex-row md:gap-x-16 lg:w-full rounded-md px-2 py-2">
              <div>
                <div className="flex items-center gap-x-5 flex-wrap">
                  <h1 className="text-base font-bold">Applied Filters :</h1>
                  {appliedFilter.map((filter) => (
                    <h1 className="text-sm border px-1 py-1 rounded-md">
                      {filter}
                      <X size={15} className="inline-block ml-2 cursor-pointer" onClick={() => manageAppliedFilter(filter)}/>
                    </h1>
                  ))}
                </div>
              </div>
              <button onClick={removeAppliedFilter} className="max-lg:mt-5">
                <div className="flex items-center justify-between gap-1 text-hoverOrange border border-hoverOrange px-1 py-1 rounded-md w-[160px] lg:w-full">
                  <h1 className="text-sm font-bold ">Clear All Filters</h1>
                  <X size={15} />
                </div>
              </button>
            </div>          
          )}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchedRestaurants();
                    }
                  }}
                  className="pl-10 shadow-lg"
                />
                <Search 
                  className="text-gray-500 absolute inset-y-2 left-2 cursor-pointer"
                  onClick={handleSearchedRestaurants}
                />
              { searchQuery && (
                <X size={20} className="absolute right-[30px] cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchedRestaurant([]);
                    useRestaurantStore.setState({ appliedFilter: [] });
                  }}
                />
              )}
              </>
            )}
          </div>
          { searchedRestaurant && searchedRestaurant?.length > 0 && (
            <RestaurantCards restaurants={searchedRestaurant} loading={loading}/> 
          )}
          { searchedRestaurant?.length < 1 && appliedFilter.length < 1 &&  restaurants?.length > 0 && (
            <>
              <DishSlider/>
              <RestaurantCards restaurants={restaurants} loading={loading}/>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage