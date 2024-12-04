
export type TMenuItem = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  menu: string;
}

export type TMenu = {
  _id: string;
  restaurant: string;  
  name: string;
  description: string;
  image: string;           
  menuItems: TMenuItem[]
}
