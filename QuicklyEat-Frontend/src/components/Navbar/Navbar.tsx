import { Link } from "react-router-dom";
import { Loader2, Moon, ShoppingCart, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MobileNavbar from "./MobileNavbar";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cartStore";
import { useThemeStore } from "@/store/themStore";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <div className="max-w-[1350px] mx-auto w-full bg-white dark:bg-background fixed z-20 max-lg:left-0 top-0 py-2 lg:py-4">
      <div className="flex items-center justify-between h-14 max-lg:pl-[30px]">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo} 
            alt="logo"
            className="w-[40px] h-[40px] lg:w-[70px] lg:h-[70px] rounded-full "
          />
          <h1 className="font-bold text-xl text-hoverOrange lg:font-extrabold lg:text-3xl font-nunito ">QuicklyEat</h1>
        </Link>
        <div className="hidden lg:flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Your Orders</Link>
            <Link to="/favourite">Favourite</Link>

            {!user?.admin && (
              <Link to="/admin/restaurant">
                <Button variant={"secondary"} className="border border-black border-opacity-20 dark:border-white dark:border-opacity-20 hover:scale-105 transition-all duration-200">List Your Restaurant</Button>
              </Link>
            )}

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={()=> setTheme('light')}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=> setTheme('dark')}>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart />
              {cart.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                >
                  {cart.length}
                </Button>
              )}
            </Link>
            <div>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {loading ? (
                <Button className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={logout}
                  className="bg-orange hover:bg-hoverOrange"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="lg:hidden fixed right-10">
          {/* Mobile responsive  */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

