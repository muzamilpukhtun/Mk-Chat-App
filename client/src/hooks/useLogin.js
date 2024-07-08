// // import { useState } from "react";
// // import { useAuthContext } from "../context/AuthContext";
// // import toast from "react-hot-toast";


// // const useLogin = () => {
// //     const [loading, setLoading] = useState(false);
// //     const { setAuthUser } = useAuthContext();

// //     const login = async (username,password) => {
// //             const success = handleInputErrors(username, password);
// //             if (!success) return;
// //         setLoading(true);
// //         try {
// //             const res = await fetch("/api/v1/login", {  // Corrected endpoint to login
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body:JSON.stringify({username,password})
// //             });
// //             const data = await res.json();  // Await the JSON parsing
// //             if (data.error) {
// //                 throw new Error(data.error);
// //             }
// //             localStorage.setItem("chat-user",JSON.stringify(data));
// //             setAuthUser(data);
// //         } catch (error) {
// //             toast.error(error.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return { loading, login };  // Return loading state and login function
// // };

// // export default useLogin;


// // function handleInputErrors(username, password) {
// // 	if (!username || !password) {
// // 		toast.error("Please fill in all fields");
// // 		return false;
// // 	}
// // 	if (password.length < 6) {
// // 		toast.error("Password must be at least 6 characters");
// // 		return false;
// // 	}

// // 	return true;
// // }
// import { useState } from "react";
// import { useAuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const useLogin = () => {
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext();

//     const login = async (username, password) => {
//         const success = handleInputErrors(username, password);
//         if (!success) return;
        
//         setLoading(true);
//         try {
//             const res = await fetch("/api/v1/login", { // Corrected endpoint to login
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password })
//             });

//             const data = await res.json(); // Await the JSON parsing
//             console.log(data)

//             if (data.error) {
//                 throw new Error(data.error);
//             }

//             // Store the refresh token and set the access token as a cookie
//             // localStorage.setItem("refreshToken", data.refreshToken);
//             // document.cookie = `token=${data.accessToken};path=/`;

//             // Store user data
//             localStorage.setItem("chat-user", JSON.stringify(data.user));
//             setAuthUser(data.user);
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, login }; // Return loading state and login function
// };

// export default useLogin;

// function handleInputErrors(username, password) {
//     if (!username || !password) {
//         toast.error("Please fill in all fields");
//         return false;
//     }
//     if (password.length < 6) {
//         toast.error("Password must be at least 6 characters");
//         return false;
//     }

//     return true;
// }
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/v1/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}