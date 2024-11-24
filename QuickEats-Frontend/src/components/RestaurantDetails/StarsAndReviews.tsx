import { Star } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import config from "@/config/config";
import { useState } from "react";
import { toast } from "sonner";

const StarsAndReviews = ({reviews, averageRating, restaurantId}: { reviews: any, averageRating: any, restaurantId: string}) => {

  // States for form handling
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To manage submission state

  // Handle rating change
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !comment) {
      toast.error("Rating and comment are required")
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${config.baseUri}/api/v1/review/${restaurantId}`, {
        rating,
        comment
      },
      {
        withCredentials: true
      } 
    );
      
      // After submitting, reset the form and handle the success response (you can update state or UI here)
      setRating(null);
      setComment("");
      setIsSubmitting(false);
      
      if(response.data.success){
        toast.success(response.data.message)
      }
      
    } catch (error: any) {
      console.error("Error adding review:", error);
      toast.error(error.response.data.message)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Star fill="orange" size={15}/>
        <div className="text-sm">{averageRating?.toFixed(1)} / 5</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="text-sm">({reviews?.length})</div>
        <Dialog>
          <DialogTrigger className="text-[#D19254] text-base hover:scale-110  transition-all duration-200">See reviews</DialogTrigger>
          <DialogContent className="w-full h-[550px] overflow-auto">
            <div className="flex flex-col gap-4">
              {reviews?.map((review: any) => (
                <div key={review._id} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <img 
                      src={review?.userId?.profilePicture} 
                      alt="profile pic"
                      className={`${review?.userId?.profilePicture? "": 'bg-black dark:bg-white'} w-6 h-6 rounded-full` }                    />
                    <div className="font-bold">{review?.userId?.fullname}</div>
                    <div className="flex items-center gap-1">
                      <Star fill="orange" size={15}/>
                      <div >{review?.rating}</div>
                    </div>
                  </div>
                  <div className="pl-5">{review?.comment}</div>
                </div>
              ))}
            </div>
            
            {/* Review submission form */}
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* Render Star Rating */}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        fill={star <= rating! ? "orange" : "gray"} 
                        size={20} 
                        onClick={() => handleRatingChange(star)} 
                      />
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                    className="p-2 border border-gray-300 rounded text-black"
                    rows={4}
                  />
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-2 p-2 bg-[#D19254] text-white rounded"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>

  )
}

export default StarsAndReviews