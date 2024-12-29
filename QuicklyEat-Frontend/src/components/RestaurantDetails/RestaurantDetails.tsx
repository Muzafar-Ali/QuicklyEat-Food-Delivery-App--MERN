import { Bike,  ShoppingBag, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useRestaurantStore } from "@/store/restaurantStore";
import RestuarantMenu from "./RestaurantMenu";
import { TRestaurant } from "@/types/restaurantType";
import StarsAndReviews from "./StarsAndReviews";

const RestaurantDetails = () => {
  const params = useParams(); 
  const [singleRestaurant, setSingleRestaurant] = useState<TRestaurant>();
  const { getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    const getRestaurant = async () => {
      const singleRestaurant = await getSingleRestaurant(params.id!);
      setSingleRestaurant(singleRestaurant);
    } 
    getRestaurant();
  }, [params.id]);
  
  return (
    // Restaurant Details
    <div className="max-w-6xl mx-auto w-full my-20">
      {/* Mobile section */}
      <section className="flex flex-col  gap-6 mb-5 md:hidden">
        <div className="flex space-x-4">
          <img src={singleRestaurant?.imageUrl} className="w-20 h-20 object-cover rounded-lg"/>
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-start font-roboto tracking-wide">{singleRestaurant?.restaurantName}</h1>
            <div className="flex gap-2 my-2 flex-wrap">
              {singleRestaurant?.cuisines.map((cuisine: string, index: number) => (
              <div key={index} className="flex items-center gap-x-2">
                <div key={index} className="px-2 border rounded-e-xl bg-secondary text-sm capitalize">{cuisine}</div>
                { index !== singleRestaurant?.cuisines.length - 1 && <div className="text-base lg:text-lg text-gray-400">-</div>}
              </div>
              ))}
          </div>

          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              <h1 className="flex items-center gap-2 font-medium">
                Delivery Time: <span className="text-[#D19254]">{singleRestaurant?.deliveryTime} mins</span>
              </h1>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center space-x-2">
                <Bike size={18}/> <span className="text-[#D19254] text-base">Free delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShoppingBag size={16}/> 
                <span>Min.order 
                  {singleRestaurant?.minimumOrder === 0 ? '': <span className="text-[#D19254]"> $</span>} 
                  {singleRestaurant?.minimumOrder === 0 ? " Not required -": <span className="text-[#D19254]">{singleRestaurant?.minimumOrder}</span>}
                </span>
              </div>
              <div className="flex items-center gap-2">
              <StarsAndReviews reviews={singleRestaurant?.reviews} averageRating={singleRestaurant?.averageRating} restaurantId={singleRestaurant?._id!}/>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop section */}
      <section className="md:flex items-center gap-6 mb-5 hidden">
        <div>
          <img src={singleRestaurant?.imageUrl} className="w-44 h-48 object-cover rounded-lg"/>
        </div>
        <div className="mt-2">
          <div className="flex gap-2 my-2">
            {singleRestaurant?.cuisines.map((cuisine: string, index: number) => (
              <div className="flex items-center gap-x-2">
                <div key={index} className="px-2 border rounded-e-xl bg-secondary capitalize">{cuisine}</div>
                { index !== singleRestaurant?.cuisines.length - 1 && <div className="text-lg text-gray-400">-</div>}
              </div>
            ))}
          </div>
          <h1 className="font-bold text-3xl text-start font-roboto tracking-wide">{singleRestaurant?.restaurantName}</h1>
          <div className="flex flex-col gap-2 my-5 flex-wrap">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              <h1 className="flex items-center gap-2 font-medium">
                Delivery Time: <span className="text-[#D19254]">{singleRestaurant?.deliveryTime} mins</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Bike size={18}/> <span className="text-[#D19254] text-base">Free delivery</span>
              <ShoppingBag size={16}/> 
              <span>Min.order 
                {singleRestaurant?.minimumOrder === 0 ? '': <span className="text-[#D19254]"> $</span>} 
                {singleRestaurant?.minimumOrder === 0 ? " Not required -": <span className="text-[#D19254]">{singleRestaurant?.minimumOrder}</span>}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StarsAndReviews reviews={singleRestaurant?.reviews} averageRating={singleRestaurant?.averageRating} restaurantId={singleRestaurant?._id!}/>
            </div>
          </div>
        </div>
      </section>
      <Separator/>
      
      {/* menu and dishes */}
      <section className="w-full">
        <RestuarantMenu menus={singleRestaurant?.menus!} restaurantId={singleRestaurant?._id!}/>
      </section>
    </div>
  );
};

export default RestaurantDetails;