 
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/orderStore";
import { useEffect, useState } from "react"; 
import { TOrder } from "@/types/orderType";
import { useCartStore } from "@/store/cartStore";

const Success = () => {
  const [orders, setOrders] = useState<TOrder[]>([])
  const { getOrderDetails } = useOrderStore();
  const { clearCart } = useCartStore();
  
  useEffect(() => {
    const getOrders = async () => {
      const orders = await getOrderDetails();
      setOrders(orders);
    }
    clearCart();
    getOrders();
    
  }, []);

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200 flex flex-col gap-5">
          <div className="flex flex-col md:items-start gap-5 text-lg md:text-2xl">
            <p>Thanks for shopping with us!</p>
            <p>Your order has been placed successfully</p>
          </div>
          <Link to="/order/status">
            <Button className="bg-transparent border border-black border-opacity-30 dark:border-white dark:border-opacity-30 ">
              <p className="text-[#FF5A5A] md:text-start font-medium text-lg md:text-xl">
                Please check your order status in Order
              </p>
            </Button>
          </Link>
        </div>
        <Link to="/">
          <Button className="bg-orange hover:bg-hoverOrange w-full md:w-[50%] py-3 rounded-md shadow-lg font-bold md:text-base ">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;