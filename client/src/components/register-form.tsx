import axios from "axios";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "../schemas";

import googleIcon from "../assets/google-icon.webp";
import { toast } from "sonner";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.error);
        return toast.error(error.response?.data.error);
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async () => {
    console.log("Google Auth");
  };

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    registerUser(data);
  };

  return (
    <div className="bg-light dark:bg-dark text-on-light dark:text-on-dark font-kumb min-h-screen flex items-center justify-center ">
      <div className="bg-surface-container-highest-light dark:bg-surface-container-highest-dark max-w-[400px] w-[calc(100%-26px)] rounded-lg p-4 ">
        <h1 className="text-3xl font-bold text-center mb-6">Sign up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3 mt-5"
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              disabled={isLoading}
              {...register("name")}
              className="p-3 border rounded-lg bg-light dark:bg-dark border-on-surface-variant-light"
            />
            {errors.name && (
              <span className="text-sm text-rose-500 mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              disabled={isLoading}
              {...register("email")}
              className="p-3 border rounded-lg bg-light dark:bg-dark border-on-surface-variant-light"
            />
            {errors.email && (
              <span className="text-sm text-rose-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                disabled={isLoading}
                placeholder="Password"
                {...register("password")}
                className="p-3 w-full border rounded-lg bg-light dark:bg-dark border-on-surface-variant-light"
              />
              {errors.password && (
                <span className="text-sm text-rose-500 mt-1">
                  {errors.password.message}
                </span>
              )}
              <button
                type="button"
                className="absolute right-3 top-3.5"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-y-4">
            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-full bg-primary-light hover:bg-primary-light/80 dark:bg-primary-dark hover:dark:bg-primary-dark/80 text-on-primary-light dark:text-on-primary-dark"
              disabled={isLoading}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleAuth}
              className="w-full px-4 py-2 rounded-full bg-primary-light hover:bg-primary-light/80 dark:bg-primary-dark hover:dark:bg-primary-dark/80 text-on-primary-light dark:text-on-primary-dark flex items-center justify-center gap-x-2"
              disabled={isLoading}
            >
              <img
                src={googleIcon}
                alt="Google Icon"
                width={35}
                height={35}
                className="w-7 h-7"
              />
              Sign Up with Google
            </button>
            <Link
              to="/login"
              className="w-full text-primary-light dark:text-primary-dark text-center hover:opacity-80 text-sm md:text-base"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
