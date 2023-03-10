import { useAuth } from "@/context/AuthContext";
import { async } from "@firebase/util";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { signup, currentUser } = useAuth();
  const router = useRouter();
  if (!currentUser) {
    const [credential, setCredentail] = useState({
      email: "",
      password: "",
      conf_password: "",
    });

    const handleChange = (e) => {
      setCredentail({
        ...credential,
        [e.target.name]: e.target.value,
      });
    };
    const submitData = async (e) => {
      e.preventDefault();
      if (!credential.email) {
        toast.error("Empty Email", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "default",
        });
      } else if (!credential.password) {
        toast.error("Empty Password", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "default",
        });
      } else if (credential.password !== credential.conf_password) {
        toast.error("Password din't match", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "default",
        });
      } else {
        try {
          await signup(credential.email, credential.password);
        } catch (error) {}
      }
    };
    return (
      <>
      <Head><title>Ashisf2f | signup</title></Head>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="default"
        />
        <ToastContainer />
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Todo
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={credential.email}
                      onChange={handleChange}
                      className="bg-gray-50 w-full dark:bg-gray-500 dark:text-white text-gray-900 border-gray-300 py-2 px-4 rounded-md focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={credential.password}
                      onChange={handleChange}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 w-full text-gray-900 dark:text-white dark:bg-gray-500  border-gray-300 py-2 px-4 rounded-md focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                      autoComplete=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="conf_password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="conf_password"
                      value={credential.conf_password}
                      onChange={handleChange}
                      id="conf_password"
                      placeholder="••••••••"
                      className="bg-gray-50 w-full text-gray-900 dark:text-white dark:bg-gray-500  border-gray-300 py-2 px-4 rounded-md focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                      autoComplete=""
                    />
                  </div>

                  <button
                    onClick={submitData}
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create Account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Have an account yet?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    router.push("dashboard");
  }
};

export default SignUp;
