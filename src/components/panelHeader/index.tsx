import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../service/firebaseConnect";



export function PanelHeader(){
    async function handleLogout(){
        await signOut(auth);
    }
    return(
        <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
            <Link to="/dashboard">
                 Dashboard
            </Link>

            <Link to="/dashboard/new">
                 New Car
            </Link>

            <button className="ml-auto"onClick={handleLogout}>
                Sai da conta
            </button>
        </div>
    );
}