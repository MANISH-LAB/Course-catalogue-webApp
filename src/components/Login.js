
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { updateLoggedinState ,updateUserID} from "../utils/handleHeaderStateSlice";
const Login = () => {
  const dd=useSelector((store)=>store.userGroup)
 
  const dispatch=useDispatch();
  console.log("bhar aki nhi",dd);
  const navigate = useNavigate();
  const userGroup = useSelector((store) => store.userGroup);
  
  const handleLogin = () => {
    const emailValue = document.getElementById("email").value;
    const user = userGroup.find((user) => user.email === emailValue);

    if (user) {
      const path="/user/" + user.id;
      dispatch(updateLoggedinState(true));
      dispatch(updateUserID(user.id))
      navigate(path)
    } else {
     
      alert("Invalid email or password");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
          
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"  onClick={handleLogin}>
         Login
        </button>
        <p className="text-sm mt-4">
          New user? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
