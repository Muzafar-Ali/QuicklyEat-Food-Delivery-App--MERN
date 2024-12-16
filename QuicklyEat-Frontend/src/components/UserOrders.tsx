 
import { useOrderStore } from "@/store/orderStore";
import { useEffect, useState } from "react"; 
import { TOrder } from "@/types/orderType";
import { Copy, CopyCheck } from "lucide-react";

const UserOrders = () => {
  const [orders, setOrders] = useState<TOrder[]>([])
  const { getOrderByUserId } = useOrderStore();

  const [copiedOrder, setCopiedOrder] = useState(null); // Track copied order by ID

  // Function to copy text to clipboard
  const copyToClipboard = (orderId: any) => {
    navigator.clipboard.writeText(orderId).then(() => {
      setCopiedOrder(orderId); // Set the copied order ID
      setTimeout(() => setCopiedOrder(null), 2000); // Reset the "copied" state after 2 seconds
    });
  };


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
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg py-6 px-4 md:px-10 max-w-5xl w-full max-md:my-10 ">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>
          {/* Your Ordered Item Display here  */}
          {orders?.map((order, index: number) => (
            <div className="flex flex-col md:flex-row items-center justify-between gap-20 border border-black border-opacity-20 dark:border-white dark:border-opacity-20 p-2 rounded-lg mt-2 bg-gray-50 dark:bg-gray-700">
              <div key={index} className="flex-1">
                <div className="flex flex-col md:flex-row items-center justify-center md:gap-5 mb-4"> 
                  <h1 className="text-sm md:text-base">Order Id:</h1>
                  <div className="flex items-center md:space-x-2">
                    <h1 className="text-sm md:text-base truncate max-md:max-w-[110px]">{order._id}</h1>
                    <button
                      onClick={() => copyToClipboard(order._id)}
                      aria-label="Copy Order ID"
                    >
                      {/* Show CopyCheck icon for the copied order, otherwise show Copy icon */}
                      {copiedOrder === order._id ? ( <CopyCheck size={18} /> ) : ( <Copy size={18} /> )}
                    </button>
                  </div>
                </div>
                {order.cartItems?.map((item) => (
                  <div className="md:mb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center md:gap-20 mb-4">
                      <div className="flex flex-col md:flex-row items-center">
                        <img
                          src={item.menuItemId?.image}
                          alt=""
                          className="w-10 h-10 rounded-md object-cover"
                          />
                        <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium text-sm lg:text-base">
                          {item.menuItemId?.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                          <span className="text-sm md:text-base font-medium "><span className="">QT: </span>{item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                          <span className="text-sm md:text-base font-medium"><span>$ </span>{item?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col mb-10 md:hidden">
                  <span className="text-sm">{'Status'}</span>
                  <span className="text-[#FF5A5A] text-sm">{order.status?.toUpperCase()}</span>
                </div>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-base">{'Status'}</span>
                <span className="text-[#FF5A5A] text-base">{order.status?.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;