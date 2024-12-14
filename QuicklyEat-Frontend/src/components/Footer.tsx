import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import logo from "@/assets/logo.png";
import { Facebook, Instagram, Twitter } from "lucide-react";


const Footer = () => {
  return (
    <div className="mt-20">
      <Separator/>
      <div className="flex items-center justify-between m-5">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center space-x-2 opacity-50 hover:opacity-100">
            <img
              src={logo} 
              alt="logo"
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full "
            />
            <h1 className="font-bold text-base text-hoverOrange md:font-extrabold md:text-xl font-nunito ">QuicklyEat</h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="bg-hoverOrange p-2 rounded-full opacity-50 hover:opacity-100 cursor-pointer">
            <Facebook/>
          </div>
          <div className="bg-hoverOrange p-2 rounded-full opacity-50 hover:opacity-100 cursor-pointer">
            <Instagram/>
          </div>
          <div className="bg-hoverOrange p-2 rounded-full opacity-50 hover:opacity-100 cursor-pointer">
            <Twitter/>
          </div>
        </div>
      </div>
      <Separator className=""/>
      <div className="text-start text-sm md:text-base mt-2 mb-10 opacity-80">
      <span>&#169;</span> 2024 QuicklyEat. All rights reserved.
      </div>
    </div>
  )
}

export default Footer