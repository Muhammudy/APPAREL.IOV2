import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import apiClient from "@/api/apiClient";

import { toast } from "sonner";


const handleSocialLogin = (provider) => {

    let oauthUrl = '';

    if (provider === 'google') {
        oauthUrl = 'http://localhost:3000/login/oauth2/google';
    }
    else if (provider === 'github') {
        oauthUrl = 'http://localhost:3000/login/oauth2/github';
    }
    window.location.href = oauthUrl;

};


function Login() {
  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "var(--color-normalbg)", color: "var(--color-foreground)" }}
    >
      {/* Left side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <Card
            style={{
              backgroundColor: "var(--color-card)",
              color: "var(--color-card-foreground)",
              borderRadius: "var(--radius)",
              backdropFilter: "blur(10px)",
              border: `1px solid var(--color-border)`,
            }}
          >
            <CardHeader className="space-y-1 text-center">
              <CardTitle
                style={{
                  color: "var(--color-primary)",
                  background: "linear-gradient(90deg, var(--color-primary), var(--color-dark))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome Back
              </CardTitle>
              <CardDescription style={{ color: "var(--color-muted-foreground)" }}>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  variant="social"
                  className="w-full"
                  size="lg"
                  onClick = {() => handleSocialLogin('google')}
                  style={{ backgroundColor: "var(--color-lighter)", color: "var(--color-foreground)" }}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <Button
                  variant="social"
                  className="w-full"
                  size="lg"
                  style={{ backgroundColor: "var(--color-lighter)", color: "var(--color-foreground)" }}
                >
                  <Github className="w-5 h-5 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" style={{ borderColor: "var(--color-border)" }} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span
                    style={{
                      backgroundColor: "var(--color-card)",
                      color: "var(--color-muted-foreground)",
                      padding: "0 0.5rem",
                    }}
                  >
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <Form method = "POST" className="space-y-4">
                <Input
                name = "email"
                  id = "email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12"
                  style={{
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-card-foreground)",
                    borderColor: "var(--color-border)",
                  }}
                  required
                />
                <Input
                name = "password"
                  id = "password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-12"
                  style={{
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-card-foreground)",
                    borderColor: "var(--color-border)",
                  }}
                  required
                  minLength={4}
                  maxLength={20}
                />
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" style={{ accentColor: "var(--color-primary)" }} />
                    <span style={{ color: "var(--color-muted-foreground)" }}>Remember me</span>
                  </label>
                  <a href="#" style={{ color: "var(--color-primary)" }}>
                    Forgot password?
                  </a>
                </div>
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full h-12 font-semibold"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" }}
                >
                  Sign In
                </Button>
              </Form>

              <div className="text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                Don't have an account?{" "}
                <Link className = "underline"to = '/signup' style={{ color: "var(--color-primary)"}}>
                Create your account 
                </Link>               
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Hero image */}
      <div className="w-1/2" style={{ backgroundColor: "var(--color-light)" }}></div>
    </div>
  );
}


export async function loginAction({request}){
  const data = await request.formData();
  const loginData = {
    email : data.get('email'),
    password: data.get('password'),
  };
  try{
    const response = await apiClient.post('auth/login', loginData);
    const {message , token, success} = response.data;
    console.log("Login succesful:", message);
    localStorage.setItem("token", token);
    toast.success("Login successful", {description : message});

    //maybe we save the jwt token
    //add some toast functionality the user is able to see
    return redirect('/dashboard');


  }
  catch(error){
  console.error("Login failed:", error);

  const message =
    error.response?.data?.message || // match your backend key
    "Login failed. Please try again later.";
  toast.error("Login failed", { description: message }); //fix this error later

  return {error : message}

  }
}

export default Login;
