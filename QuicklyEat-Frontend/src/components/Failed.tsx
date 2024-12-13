import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Failed = () => {
  return (
    <div className="min-h-[650px] flex items-center ">
      {/* <div className="px-[20px]"> */}
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="text-2xl font-bold">Payment failed!</div>
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          <div className="text-orange font-bold">info@quicklyeat.com</div>

          <Link to="/" className="mt-5">
            <Button className="bg-orange hover:bg-hoverOrange w-full md:w-[50%] py-3 rounded-md shadow-lg font-bold md:text-base">
            Continue Shopping
            </Button>
        </Link>
        </div>
      </div>
    // </div>
  );
};

export default Failed;