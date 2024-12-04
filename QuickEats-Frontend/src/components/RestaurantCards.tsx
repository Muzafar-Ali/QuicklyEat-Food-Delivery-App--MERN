import { TAllRestaurants } from "@/types/restaurantType"
import { Card, CardContent } from "./ui/card"
import { AspectRatio } from "./ui/aspect-ratio"
import { Timer, Soup, Bike, Star } from "lucide-react"
import { Link } from "react-router-dom"
import StarsAndReviews from "./RestaurantDetails/StarsAndReviews"
import SearchPageSkeleton from "./SearchPage/SearchPageSkeleton"


const RestaurantCards = ({ restaurants, loading }: {restaurants: TAllRestaurants["data"] | null, loading: boolean}) => {
  return (
    <div className="mt-5">
      <div className="text-xl lg:text-2xl text-start font-normal md:font-bold pl-4">All Restaurants</div>
      <div className="grid md:grid-cols-3 gap-x-4 gap-y-6 w-full mt-1">
        {loading ? ( <SearchPageSkeleton /> )  : 
        (
          restaurants?.map((restaurant) => (
          <div key={restaurant?._id}>
            <Card
            key={restaurant._id}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-black border-opacity-20 dark:border-opacity-20 dark:border-white"
            >
              <Link to={`/restaurant/${restaurant?._id}`} className="relative">
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={restaurant?.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    />
                </AspectRatio>
                {restaurant.topRestuarant && (
                  <div className="absolute top-2  bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg ml-2 px-3 py-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <p className="text-black dark:text-hoverOrange text-base fonb">Top</p> <Star fill="orange" size={15}/>
                      </div>  
                    </span>
                  </div>
                )}
              </Link>
              <CardContent className="px-4 pb-1">
                <Link to={`/restaurant/${restaurant?._id}`}>
                  <h1 className="text-2xl text-left capitalize font-bold font-roboto tracking-wide text-gray-700 dark:text-gray-200 line-clamp-1 mt-1">
                    {restaurant?.restaurantName}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 opacity-70">
                    <Soup size={20} />
                    <p className="text-sm">
                      <span className="font-medium line-clamp-1">{restaurant?.cuisines[0]}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-70 mb-2">
                    <Timer className="w-5 h-5" />
                    <h1 className="flex items-center gap-2 font-normal">
                      <span className="text-sm">Delivery in</span> <span className="text-[#D19254] text-sm">{restaurant?.deliveryTime || "NA"} mins</span> 
                      <span className=" opacity-50" >*</span>
                      <div className="flex items-center space-x-1">
                        <span className="opacity-70"><Bike size={14}/></span><span className="text-[#D19254] text-sm">Free</span>
                      </div>
                    </h1>
                  </div>
                </Link>
                <StarsAndReviews reviews={restaurant?.reviews} averageRating={restaurant?.averageRating} restaurantId={restaurant._id!}/>
              </CardContent>
            </Card>
          </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RestaurantCards