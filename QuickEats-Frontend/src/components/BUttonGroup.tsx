import { ArrowRight } from 'lucide-react';

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div >
        <div className="w-8 md:w-11 h-8 md:h-11 p-1 bg-white border border-stone-300 rounded-full justify-center items-center inline-flex absolute top-[28%] left-[0%]">
          <button 
            aria-label="Previous slide"
            onClick={() => previous()}
            className="w-5 md:w-8 h-5 md:h-8 justify-center items-center flex" 
          >
            <ArrowRight className="w-3 md:w-6 h-3 md:h-6 rotate-180 bg-transparent dark:text-black" />
          </button>
        </div>
  
        <div className="w-8 md:w-11 h-8 md:h-11 p-1 bg-white border border-stone-300 rounded-full justify-center items-center inline-flex absolute top-[28%] right-[0%]">
          <button
            aria-label="Next slide" 
            onClick={() => next()}
            className="w-5 md:w-8 h-5 md:h-8 justify-center items-center flex" 
          >
            <ArrowRight className="w-3 md:w-6 h-3 md:h-6 bg-transparent dark:text-black" />
          </button>  
        </div>
      </div>
     );
   };
export default ButtonGroup;