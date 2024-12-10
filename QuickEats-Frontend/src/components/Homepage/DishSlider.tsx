import { useRestaurantStore } from "@/store/restaurantStore";
import ButtonGroup from "../ButtonGroup";
import menuItems from "@/utils/menuItems";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DishSlider = () => {
  const { manageAppliedFilter } = useRestaurantStore()
  
  const responsive = {
    laptopLarge: {
      breakpoint: { max: 3000, min: 1440 },
      items: 10,
      partialVisibilityGutter: 40,
    },
    laptop: {
      breakpoint: { max: 1439, min: 1024 },
      items: 10,
      partialVisibilityGutter: 40,
    },
    tablet2: {
      breakpoint: { max: 1023, min: 931 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 930, min: 600 },
      items: 6,
    },
    mobileLarge2: {
      breakpoint: { max: 599, min: 531 },
      items: 4,
    },
    mobileLarge: {
      breakpoint: { max: 530, min: 321 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 320, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="max-w-[1050px] pt-2 md:pt-5">
      <div className="text-2xl text-start font-normal md:font-bold pl-4">Select By Cuisine</div>
      <Carousel
        responsive={responsive}
        arrows={false}
        swipeable={true}
        draggable={true}
        itemClass="px-[5px] tablet-s:px-[10px]"
        containerClass=" py-2"
        // renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        { menuItems?.map((menu, index) => (
          <div
          key={index} 
            className="flex flex-col items-center gap-2 cursor-pointer" 
            onClick={() => manageAppliedFilter(menu.name)}
          >
            <img 
              src={menu.image} 
              loading="lazy" 
              alt="" 
              className="w-24 h-24 object-cover rounded-lg border border-black border-opacity-20 dark:border-opacity-20 dark:border-white " 
            />
            <h1 className="capitalize">{menu.name}</h1>
          </div>
            
        ))}
      </Carousel>
    </div>
  )
}

export default DishSlider