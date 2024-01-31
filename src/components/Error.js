import {useRouteError} from "react-router-dom";
const Error=()=>{
const err=useRouteError();

return (
    <div className="text-center items-center h-screen">
        <h1>{err}</h1>
            
    </div>
)
}
export  default Error;