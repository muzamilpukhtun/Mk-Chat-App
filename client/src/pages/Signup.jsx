import GenderCheckBox from './GenderCheckBox';
const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
    <div className="w-full p-6 rounded-lg shadow-md  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg backdrop-opacity-0">
    <h1 className="text-3xl font-semibold text-center text-gray-300">
    Sign Up  
    <span className="text-blue-500"> Chat App</span>
    </h1>
    <form>
    <div>
    <label className="label p-2">
    <span className="text-base label-text">Full name</span>
    </label>
    <input type="text" placeholder="Enter your Name" className="w-full input input-bordered h-10 focus:outline-none"/>
    </div>

    <div>
    <label className="label p-2">
    <span className="text-base label-text">Username</span>
    </label>
    <input type="text" placeholder="Enter your username" className="w-full input input-bordered h-10 focus:outline-none"/>
    </div>

    <div>
    <label className="label p-2">
    <span className="text-base label-text">Password</span>
    </label>
    <input type="password" placeholder="Enter your Password" className="w-full input input-bordered h-10 focus:outline-none"/>
    </div>
    <div>
    <label className="label p-2">
    <span className="text-base label-text">Confirm Password</span>
    </label>
    <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10 focus:outline-none"/>
    </div>
    {/*Gender check box*/}
    <GenderCheckBox/>

    <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account?</a>

    <div>
    <button className="btn btn-block btn-sm mt-2">Sign Up</button>
    </div> 

    </form>
    </div>
    </div>
  )
}

export default Signup