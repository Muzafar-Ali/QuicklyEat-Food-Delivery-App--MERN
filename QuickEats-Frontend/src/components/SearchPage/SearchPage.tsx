import { Link, useParams } from "react-router-dom";
import FilterPage from "../FilterPage";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
// import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Restaurant } from "../../types/restaurantType";
import SearchPageSkeleton from "./SearchPageSkeleton";
import NoResultFound from "./NoResultFound";
import { useRestaurantStore } from "@/store/restaurantStore";
import RestaurantCards from "../RestaurantCards";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
    manageAppliedFilter,  
    appliedFilter,
  } = useRestaurantStore();  

  console.log('searchedRestaurant', searchedRestaurant);
  const [kya, setKya] = useState<string>('')
  
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage
        kya ={kya}
        setKya = {setKya} 
        />
        <div className="flex-1">
          {/* Search Input Field  */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={() =>
                searchRestaurant( searchQuery, appliedFilter)
              }
              className="bg-orange hover:bg-hoverOrange"
            >
              Search
            </Button>
          </div>
          {/* searched items display starts*/}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                {/* ({searchedRestaurant ??  0}) <span>Search result found</span>  */}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((selectedFilter: string, index: number) => (
                    <div
                      key={index}
                      className="relative inline-flex items-center max-w-full"
                    >
                      <Badge
                        className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                        variant="outline"
                      >
                        {selectedFilter}
                      </Badge>
                      <X
                        onClick={() => manageAppliedFilter(selectedFilter)}
                        size={16}
                        className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {/* Restaurant Cards  */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* {loading ? ( <SearchPageSkeleton /> ) : !loading && searchedRestaurant?.data?.length === 0 ? (
                <NoResultFound searchText={params.text!} />
              ) : ( */}
                <RestaurantCards restaurants={searchedRestaurant} loading={loading}/>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;



