import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
export default function OAuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token){
            localStorage.setItem('jwtToken', token);
            console.log("Token saved to localStorage:", token);
            toast.success("Login successful");
            navigate('/dashboard');
        }
        else{
            console.error("No token found in URL");
            toast.error("Login failed");
            navigate('/login');
        }

    }, [location, navigate]);

    return null;
}
