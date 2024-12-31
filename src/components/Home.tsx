import img from "../assets/image 2.png";

function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-green-900 text-white flex items-center">
    {/* Left Section */}
    <div className="flex-1 max-w-xl m-20">
      <div className="mb-6 ">
        <div className="flex items-center text-yellow-400">
          <span className="mr-2 text-xl">★★★★★</span>
          <p className="text-base text-white">Highly Rated Salons Near You</p>
        </div>
      </div>
      <h1 className="text-7xl font-[InterVariable] mb-8">
        Find & Book Salons Near You Instantly!
      </h1>
      <p className="text-lg leading-relaxed mb-10">
        Discover top-rated salons and book appointments at your convenience. Look great, feel confident!
      </p>
      <div className="flex items-center space-x-5">
          <a href="#" className="text-sm text-green-500 underline font-medium hover:text-green-400 ">
            Start work efficiently with UIFry SaaS product
          </a>
      <button className="px-2 py-1  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
            Get a Free Demo
          </button>
        </div>
        </div>
      

    {/* Right Section */}
    <div className="flex-1 flex justify-end items-center pr-20">
      <img
        src={img}
        alt="Salon Booking"
        className="w-[500px] max-w-full object-contain"
      />
    </div>
  </div>
);
}

export default Home;
