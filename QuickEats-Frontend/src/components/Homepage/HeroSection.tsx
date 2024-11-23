import HeroImage from "@/assets/hero_image.png";

const HeroSection = () => {
  
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[60%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Your Food anytime, anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicios food is waiting for you, we are always near to
            you.
          </p>
        </div>
      </div>
      <div>
        <img 
        src={HeroImage} 
        alt="hero image" 
        className="object-cover w-full max-h-[350px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;