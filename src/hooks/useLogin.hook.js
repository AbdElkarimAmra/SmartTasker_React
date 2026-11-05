import {useMutation} from "@tanstack/react-query";
import { id } from "date-fns/locale";
import Cookies from "js-cookie";
const loginUser = async (user) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export function useLogin() {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            Cookies.set("token", response.data.accessToken, {expires: 1});
            Cookies.set("user", JSON.stringify({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
            }), {expires: 1});
        },
        onError: (error) => {
            console.log("error authentiacating user",error);
        }
    });
}


