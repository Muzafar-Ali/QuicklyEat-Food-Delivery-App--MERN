import Navbar from "../Navbar/Navbar"
import { Outlet } from "react-router-dom"

const HomepageLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      {/* Navbar  */}
      <header>
        <Navbar/>
      </header>

      {/* Main content  */} 
      <div className="flex-1 mt-[30px] ">
        <Outlet/>
      </div>

      {/* Footer  */}
      <footer>
        {/* <Footer/> */}
      </footer>
    </div>
  )
}
 
export default HomepageLayout