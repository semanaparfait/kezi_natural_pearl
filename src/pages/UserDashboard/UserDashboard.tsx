
import { ArrowLeft, } from "lucide-react";
import Profile from "@/pages/UserDashboard/Profile";
import PaymentMethods from "./PaymentMethods";
import Address from "./Address";
import { Link } from "react-router-dom";

function UserDashboard() {

    return (
        <section className="bg-[var(--secondary-cream-white)] ">
            <div className="pt-10 pl-10">
                <Link to="/" className="flex items-center gap-2 text-(--primary) hover:underline mb-6 transition-colors duration-200">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to home</span>
                </Link>

            </div>
            <Profile />    
            <Address/>
            <PaymentMethods/>     
            
        </section>
    );
}

export default UserDashboard;