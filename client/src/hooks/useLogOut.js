import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


const useLogOut = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/v1/logout", {  // Corrected endpoint to logout
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();  // Await the JSON parsing
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };  // Return loading state and logout function
};

export default useLogOut;
