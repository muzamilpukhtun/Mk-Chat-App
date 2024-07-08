import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ name, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({name, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/v1/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, username, password, confirmPassword, gender }),
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

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ name, username, password, confirmPassword, gender }) {
	if (!name || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}

/** @jsxImportSource @emotion/react */
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useSignUp = () => {
//     const { setAuthUser } = useAuthContext();
//     const [loading, setLoading] = useState(false);

//     const signup = async ({ name, username, password, confirmPassword, gender }) => {
//         const success = handleInputErrors({ name, username, password, confirmPassword, gender });
//         if (!success) return;

//         setLoading(true);
//         try {
//             const res = await fetch("/api/v1/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ name, username, password, confirmPassword, gender })
//             });
//             const data = await res.json();
//             if (data.error) {
//                 throw new Error(data.error);
//             }
//             // Set up local storage
//             localStorage.setItem("chat-user", JSON.stringify(data));
//             // Update context
//             setAuthUser(data);

//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, signup };
// };

// export default useSignUp;

// // Input validation function
// function handleInputErrors({ name, username, password, confirmPassword, gender }) {
//     if (!name || !username || !password || !confirmPassword || !gender) {
//         toast.error('Please fill in all fields');
//         return false;
//     }
//     if (password !== confirmPassword) {
//         toast.error('Passwords do not match');
//         return false;
//     }
//     if (password.length < 6) {
//         toast.error('Password must be at least 6 characters');
//         return false;
//     }
//     return true;
// }
