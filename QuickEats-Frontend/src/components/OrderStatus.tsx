 
import { useOrderStore } from "@/store/orderStore";
import { useEffect, useState } from "react"; 
import { TOrder } from "@/types/orderType";

const OrderStatus = () => {
  const [orders, setOrders] = useState<TOrder[]>([])
  const { getOrderByUserId } = useOrderStore();

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getOrderByUserId();
      setOrders(orders);
    }
    getOrders();
  }, []);
  
  if (orders?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 mt-10">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>
          {/* Your Ordered Item Display here  */}
          {orders?.map((order, index: number) => (
            <div className="flex flex-col md:flex-row items-center justify-between gap-20 border border-black border-opacity-20 dark:border-white dark:border-opacity-20 p-2 rounded-lg mt-2">
              <div key={index} className="flex-1 ">
                <div className="flex items-center justify-center gap-2 md:gap-5"> 
                  <h1>Order:</h1>
                  <h1>{order._id}</h1>
                </div>
                {order.cartItems?.map((item) => (
                  <div className="md:mb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-20">
                      <div className="flex flex-col md:flex-row items-center">
                        <img
                          src={item.menuItemId?.image}
                          alt=""
                          className="w-14 h-14 rounded-md object-cover"
                          />
                        <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                          {item.menuItemId?.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                          <span className="md:text-lg font-medium"><span className="">Qty: </span>{item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                          <span className="md:text-lg font-medium"><span>$ </span>{item?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="md:hidden mb-10">
                <span className="text-[#FF5A5A]">{order.status?.toUpperCase()}</span>
              </div>
              </div>
              <div className="hidden md:block">
                <span className="text-[#FF5A5A]">{order.status?.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;