import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuItemSchema, TMenuItemSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/menuStore";
import { Loader2 } from "lucide-react";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";


const AddMenuItems = (
  { 
    menuId, 
    addMenuItemOpen, 
    setAddMenuItemOpen 
  }: {
    menuId: string;
    addMenuItemOpen: boolean;
    setAddMenuItemOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  
  const [error, setError] = useState<Partial<TMenuItemSchema>>({});
  const [input, setInput] = useState<TMenuItemSchema>({
    title: "",
    description: "",
    price: 0,
    image: undefined,
    menu: menuId,
  });

  const {loading, createMenuItem} = useMenuStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;    
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setInput({... input, menu: menuId })
    
    const result = menuItemSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<TMenuItemSchema>);
      return;
    }
     

    try {
      const formData = new FormData();
      const price = input.price.toString();

      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("price", price);
      formData.append("menu", menuId);
      if(input.image){
        formData.append("image", input.image);
      }
      const success = await createMenuItem(formData)
      if(success) setAddMenuItemOpen(false)
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <Dialog open={addMenuItemOpen} onOpenChange={setAddMenuItemOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Items to Your menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              // value={input.title}
              onChange={changeEventHandler}
              placeholder="Enter menu name"
            />
            {error && <span className="text-xs font-medium text-red-600">{error.title}</span>}
          </div>
          <div>
            <Label>price</Label>
            <Input
              type="number"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter item price"
            />
            {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter menu description"
            />
            {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({ ...input, image: e.target.files?.[0] || undefined })
              }
            />
            {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange">Submit</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItems;
