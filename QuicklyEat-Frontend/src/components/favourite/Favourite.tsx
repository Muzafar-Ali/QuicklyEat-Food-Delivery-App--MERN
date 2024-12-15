import { Link } from "react-router-dom"
import { Card, CardContent } from "../ui/card"
import { AspectRatio } from "../ui/aspect-ratio"
import { Bike, Soup, Star, Timer } from "lucide-react"
import { useUserStore } from "@/store/userStore"
import { useEffect, useState } from "react"
import { TRestaurant } from "@/types/restaurantType"
import SearchPageSkeleton from "../SearchPage/SearchPageSkeleton"
import StarsAndReviews from "../RestaurantDetails/StarsAndReviews"
import AddRemoveFavourite from "./AddRemoveFavourite"


const Favourite = () => {
  const {getAllFavourites} = useUserStore();
  const [favourites, setFavourites] = useState<TRestaurant[]>([]) 
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true)
      const response = await getAllFavourites();
      setFavourites(response);
      setLoading(false)
    }
    fetchFavourites()
  }, [])

  return (
    <div className="mt-20 px-20">
      {!favourites?.length  && (
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen">
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">No Favourites</div>
          <div className="text-lg text-gray-500 dark:text-gray-400">Add some favourites to see them here</div>
        </div>
      )}
      { favourites && favourites?.length > 0 && (
        <>
          <div className="text-xl lg:text-2xl text-start font-normal md:font-bold pl-4">All Favourites</div>
          <div className="grid md:grid-cols-3 gap-x-4 gap-y-6 w-full mt-1">
            {loading ? ( <SearchPageSkeleton /> )  : 
            (
              favourites?.map((favourite) => (
              <div key={favourite?._id}>
                <Card
                key={favourite?._id}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-black border-opacity-20 dark:border-opacity-20 dark:border-white relative"
                >
                  <Link to={`/restaurant/${favourite?._id}`} className="relative">
                    <AspectRatio ratio={16 / 10}>
                      <img
                        src={favourite?.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    {favourite?.topRestuarant && (
                      <div className="absolute top-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg ml-2 px-3 py-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          <div className="flex items-center gap-1">
                            <p className="text-black dark:text-hoverOrange text-base font-bold">Top</p> <Star fill="orange" size={15}/>
                          </div>  
                        </span>
                      </div>
                    )}
                  </Link>
                  <CardContent className="px-4 pb-1">
                    <Link to={`/restaurant/${favourite?._id}`}>
                      <h1 className="text-2xl text-left capitalize font-bold font-roboto tracking-wide text-gray-700 dark:text-gray-200 line-clamp-1 mt-1">
                        {favourite?.restaurantName}
                      </h1>
                      <div className="flex items-center gap-2 mt-1 opacity-70">
                        <Soup size={20} />
                        <p className="text-sm">
                          <span className="font-medium line-clamp-1">{favourite?.cuisines[0]}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 opacity-70 mb-2">
                        <Timer className="w-5 h-5" />
                        <h1 className="flex items-center gap-2 font-normal">
                          <span className="text-sm">Delivery in</span> <span className="text-[#D19254] text-sm">{favourite?.deliveryTime || "NA"} mins</span> 
                          <span className=" opacity-50" >*</span>
                          <div className="flex items-center space-x-1">
                            <span className="opacity-70"><Bike size={14}/></span><span className="text-[#D19254] text-sm">Free</span>
                          </div>
                        </h1>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between">
                      <StarsAndReviews reviews={favourite?.reviews} averageRating={favourite?.averageRating} restaurantId={favourite?._id!}/>
                      <div className="absolute top-2 right-2 z-10 bg-white dark:bg-gray-700 bg-opacity-75 rounded-md p-1">
                        <AddRemoveFavourite restaurantId={favourite?._id!}/>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              ))
            )}
          </div>
        </>

      )}
    </div>
  )
}

export default Favourite