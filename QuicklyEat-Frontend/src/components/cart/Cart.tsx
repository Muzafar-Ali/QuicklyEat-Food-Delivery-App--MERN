import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { CartItem } from "@/types/cartType";
import { useCartStore } from "@/store/cartStore";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, increaseQuantity, decreasetQuantity, removeFromTheCart, clearCart } = useCartStore();

  let totalAmount = cart.reduce((acc: number, ele: { price: number; quantity: number; }) => {
    return acc + ele.price * ele.quantity;
  }, 0);
  
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-20">
      <div className="flex justify-end">
        <Button 
          onClick={() => clearCart()}
          variant="link"
        >
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart?.map((item: CartItem) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar className="rounded-sm w-20 h-16">
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-start"> {item.title}</TableCell>
              <TableCell className="text-start"> {item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decreasetQuantity(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-accent hover:bg-gray-400"
                  >
                    <Minus />
                  </Button>
                  <Button
                    size={"icon"}
                    className="font-bold border-none"
                    disabled
                    variant={"outline"}
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => increaseQuantity(item._id)}
                    size={"icon"}
                    className="rounded-full bg-orange hover:bg-hoverOrange"
                    variant={"outline"}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-start">{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button 
                  onClick={() => removeFromTheCart(item._id)}
                  size={"sm"} className="bg-orange hover:bg-hoverOrange">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange"
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;