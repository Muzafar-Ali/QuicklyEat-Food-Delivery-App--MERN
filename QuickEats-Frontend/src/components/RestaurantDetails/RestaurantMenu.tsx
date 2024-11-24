import { TMenu } from "@/types/restaurantType";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const RestaurantMenu = ({ menus, restaurantId }: { menus: TMenu[], restaurantId: string }) => {
  const { addToCart } = useCartStore();
  
  return (
    <div className="mt-5">
      {menus?.map((menu) => (
        <div className="flex flex-col items-start gap-4">
          <h1 className="font-bold text-2xl font-roboto tracking-wide mt-16 opacity-80">{menu.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
            {menu?.menuItems?.map((item) => (
              <Card className="flex items-center justify-between space-x-2 lg:px-2 auto shadow-lg rounded-lg overflow-hidden relative" key={item._id}>
                <div className="flex-1 text-start justify-start">
                  <CardContent className="flex flex-col gap-2 max-lg:p-2">
                    <div>
                      <h3 className="text-base md:text-lg text-[#D19254] font-semibold">{item.title} </h3>
                      <h4 className="text-base md:text-lg font-semibold text-[#D19254]"><span className="text-bas">$</span> {item.price}</h4>
                    </div>
                    <p className="text-sm lg:text-base text-gray-400 line-clamp-2">{item.description}</p>
                  <button
                    onClick={() => {
                      addToCart(item, restaurantId);
                      toast.success("item added to cart");
                    }}
                    className="bg-white border border-black hover:bg-hoverOrange rounded-full px-2  absolute top-[100px] left-[500px]"
                  >
                    <span className="text-2xl text-black">+</span>
                  </button>
                  </CardContent>
                </div>
                <div className="max-md:pr-2 md:p-4">
                  <img src={item.image} alt="" className="w-24 h-24 md:w-40 md:h-32 object-cover rounded-lg border" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;