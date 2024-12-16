import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { restaurantSchema, TRestaurantSchema } from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/restaurantStore";

import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<TRestaurantSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    minimumOrder: 0,
    deliveryCharges: 0,
    cuisines: [],
    image: undefined,
  });
  const [errors, setErrors] = useState<Partial<TRestaurantSchema>>({});
  const {
    loading,
    userRestaurant,
    updateRestaurant,
    createRestaurant,
    getRestaurantbyUserId
  } = useRestaurantStore();
  
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<TRestaurantSchema>);
      return;
    }
    
    // add restaurant api implementation
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      if(input.minimumOrder) {
        formData.append("minimumOrder", input.minimumOrder.toString());
      }
      if (input.deliveryCharges) {
        formData.append("deliveryCharges", input.deliveryCharges.toString());
      }
      input.cuisines.forEach(cuisine => {
        formData.append("cuisines[]", cuisine); // Append each cuisine individually
      });

      if (input.image) {
        formData.append("image", input.image);
      }
      
      if (userRestaurant) {
        // update
        await updateRestaurant(formData);
      } else {
        // create
        await createRestaurant(formData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurantbyUserId();
    }
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (userRestaurant) {
      setInput({
        restaurantName: userRestaurant.restaurantName,
        city: userRestaurant.city,
        country: userRestaurant.country,
        deliveryTime: userRestaurant.deliveryTime,
        minimumOrder: userRestaurant.minimumOrder,
        deliveryCharges: userRestaurant.deliveryCharges,
        cuisines: userRestaurant.cuisines,
        image: undefined,
      });
    }
  }, [userRestaurant]);
  
  return (
    <div className="max-w-6xl mx-auto my-20">
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0 bg-gray-50 dark:bg-gray-800 p-5 md:p-10">
              {/* Restaurant Name  */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Enter your delivery time"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Delivery charges</Label>
                <Input
                  type="number"
                  name="deliveryCharges"
                  value={input.deliveryCharges}
                  onChange={changeEventHandler}
                  placeholder="Enter your delivery time"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.deliveryCharges}
                  </span>
                )}
              </div>
              <div>
                <Label>minimum Order</Label>
                <Input
                  type="number"
                  name="minimumOrder"
                  value={input.minimumOrder}
                  onChange={changeEventHandler}
                  placeholder="Enter your delivery time"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.minimumOrder}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="e.g. Momos, Biryani"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Restaurant Banner</Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="image/*"
                  name="image"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.image?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {userRestaurant ? "Update Your Restaurant" : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
    </div>
  );
};

export default Restaurant;
