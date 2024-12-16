import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/store/restaurantStore";
import { TOrders } from "@/types/orderType";
import { useEffect, useState } from "react";
import Orderitems from "./Orderitems";
import { Copy, CopyCheck } from "lucide-react";

const Orders = () => {
  const [restaurantOrder, setRestaurantOrder] = useState<TOrders[]>([])
  const { getRestaurantOrders, updateRestaurantOrderStatus } = useRestaurantStore();
  const [copiedOrder, setCopiedOrder] = useState(null); // Track copied order by ID

  // Function to copy text to clipboard
  const copyToClipboard = (orderId: any) => {
    navigator.clipboard.writeText(orderId).then(() => {
      setCopiedOrder(orderId); // Set the copied order ID
      setTimeout(() => setCopiedOrder(null), 2000); // Reset the "copied" state after 2 seconds
    });
  };
  
  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrderStatus(id, status);
  };

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getRestaurantOrders();
      setRestaurantOrder(orders);
    };
    getOrders(); 
  }, []);

  if (restaurantOrder?.length === 0 ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Restaurant Order not found!
        </h1>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto py-10 px-6 my-20">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* Restaurant Orders diplay here  */}
        {restaurantOrder?.map((order) => (
          <div key={order._id} className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-1 mb-6 sm:mb-0">
              <div className="text-start font-semibold text-gray-800 dark:text-gray-100 flex flex-col">
                <div className="text-base md:text-lg flex items-center gap-2 md:gap-5 flex-wrap">
                  <h1 className="text-base md:text-base">Order :</h1> 
                  <h1 className="text-sm md:text-base truncate max-md:max-w-[110px]">{order._id}</h1>
                    <button
                      onClick={() => copyToClipboard(order._id)}
                      aria-label="Copy Order ID"
                    >
                      {/* Show CopyCheck icon for the copied order, otherwise show Copy icon */}
                      {copiedOrder === order._id ? ( <CopyCheck size={18} /> ) : ( <Copy size={18} /> )}
                    </button>

                </div>
                  <div className="flex items-center gap-2 md:gap-5 flex-wrap">
                    <h1 className="text-sm md:text-base">Odered by :</h1>
                    <h1 className="text-sm md:text-base">{order.deliveryDetails?.name}</h1>
                  </div>
              </div>
              <h1 className="text-xl text-start font-semibold text-gray-800 dark:text-gray-100">
                <div>
                  <h1 className="text-sm md:text-base">Order Items: </h1>
                  <div className="flex flex-col">
                    {order?.cartItems?.map((item, index) => (
                      <Orderitems key={index} item={item} />
                    ))}
                  </div>

                </div>
              </h1>
              <p className="text-gray-600 text-start dark:text-gray-300 mt-2">
                <span className="font-semibold">Address: </span>
                {order.deliveryDetails.address}
              </p>
              <p className="text-gray-600 text-start dark:text-gray-300 mt-2">
                <span className="text-base font-semibold">Total Amount: </span>
                <span>${order.totalAmount}</span>
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <Label className="block text-sm md:text-base font-medium text-gray-800 dark:text-gray-300 mb-2">
                Order Status
              </Label>
              <Select
                onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)}
                defaultValue={order.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OnTheWay",
                      "Delivered",
                    ].map((status: string, index: number) => (
                      <SelectItem key={index} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
