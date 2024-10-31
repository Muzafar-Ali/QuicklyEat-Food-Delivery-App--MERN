import { TUserSignup, userSignupSchema } from "@/schema/userSchema";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useUserStore } from "@/store/userStore";

const Signup = () => {
  const [userInput, setuserInput] = useState<TUserSignup>({
    fullname:"",
    email:"",
    password:"", 
    // confirmPassword:"", 
    contact:0, 
  });

  const [errors, setErrors] = useState<Partial<TUserSignup>>({});
  const {signup, loading} = useUserStore();
  
  const navigate = useNavigate();

  const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setuserInput({...userInput, [name]:value});
  }
  
  const signupSubmit = async (e:FormEvent) => {
    e.preventDefault();
    // form validation check start
    const result = userSignupSchema.safeParse({...userInput, contact: Number(userInput.contact)});
    
    if(!result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<TUserSignup>);
 
      return;
    }
      
    // signup api implementation start here
    try {
      const isSignupSuccesful = await signup({...userInput, contact: Number(userInput.contact)});
      if(isSignupSuccesful) navigate("/verify-email");

    } catch (error) {
      console.error('signupSubmit error:', error);
    }
  }

return (
  <div className="flex items-center justify-center min-h-screen">
    <form onSubmit={signupSubmit} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
      <div className="mb-4">
        <h1 className="font-bold text-2xl">QuickEats</h1>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={userInput.fullname}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.fullname}</span>}
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={userInput.email}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.email}</span>}
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={userInput.password}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.password}</span>}
        </div>
      </div>
      {/* <div className="mb-4">
        <div className="relative">
          <Input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={userInput.confirmPassword}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.confirmPassword}</span>}
        </div>
      </div> */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Contact"
            name="contact"
            value={userInput.contact}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.contact}</span>}
        </div>
      </div>
      <div className="mb-10">
        {loading ? (
          <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
            Signup
          </Button>
        )}
      </div>
      <Separator/>
      <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </form>
  </div>
);
};

export default Signup