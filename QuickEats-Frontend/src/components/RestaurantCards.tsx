import { TAllRestaurants } from "@/types/restaurantType"
import { Card, CardContent } from "./ui/card"
import SearchPageSkeleton from "./SearchPage/SearchPageSkeleton"
import { AspectRatio } from "./ui/aspect-ratio"
import { Timer, Soup, Bike } from "lucide-react"
import { Link } from "react-router-dom"


const RestaurantCards = ({ restaurants, loading }: {restaurants: TAllRestaurants["data"] | null, loading: boolean}) => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {loading ? ( <SearchPageSkeleton /> )  : 
        (
          restaurants?.map((restaurant) => (
          <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id}>
            <Card
            key={restaurant._id}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative">
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={restaurant.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    />
                </AspectRatio>
                <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Featured
                  </span>
                </div>
              </div>
              <CardContent className="px-4">
                <h1 className="text-2xl text-left capitalize font-bold font-roboto tracking-wide text-gray-700 dark:text-gray-200 line-clamp-1 mt-1">
                  {restaurant.restaurantName}
                </h1>
                <div className="flex items-center gap-2 mt-1 opacity-70">
                  <Soup size={20} />
                  <p className="text-sm">
                    <span className="font-medium line-clamp-1">{restaurant.cuisines[0]}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-70">
                  <Timer className="w-5 h-5" />
                  <h1 className="flex items-center gap-2 font-normal">
                    <span className="text-sm">Delivery in</span> <span className="text-[#D19254] text-sm">{restaurant.deliveryTime || "NA"} mins</span> 
                    <span className=" opacity-50" >*</span>
                    <div className="flex items-center space-x-1">
                      <span className="opacity-70"><Bike size={14}/></span><span className="text-[#D19254] text-sm">Free</span>
                    </div>
                  </h1>
                </div>
              </CardContent>
            </Card>
          </Link>
          ))
        )}
      </div>
    </>
  )
}

export default RestaurantCards