import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from './Context/AuthContext';

export default function OAuthCallback() {
  const { loginSuccess } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      loginSuccess(token);
      navigate("/dashboard", { replace: true });
    }
  }, [location]);

  return null;
}
