import { useAuth } from "@/context/AuthContext";
import { async } from "@firebase/util";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, error, resetPassword, currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    const [credential, setCredentail] = useState({
      email: "",
      password: "",
      resetPasswordEmail: "",
    });

    const handleChange = (e) => {
      setCredentail({
        ...credential,
        [e.target.name]: e.target.value,
      });
    };
    const sendEmail = async (e) => {
      await e.preventDefault();
      if (!credential.resetPasswordEmail) {
        toast.error("Empty Email", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "default",
        });
      } else {
        await resetPassword(credential.resetPasswordEmail);
      }
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
      } else {
        try {
          await login(credential.email, credential.password);
        } catch (err) {
          toast.error(error.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "default",
          });
        }
      }
    };
    return (
      <>
      <Head ><title>Ashisf2f | Login</title></Head>
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
        <section className={`bg-gray-50 dark:bg-gray-900`}>
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
                      // required=""
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
                      required=""
                      autoComplete=""
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <label
                      htmlFor="my-modal-3"
                      className="text-blue-600 cursor-pointer hover:text-blue-400"
                    >
                      Reset Password?
                    </label>
                  </div>
                  <button
                    onClick={submitData}
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don`t have an account yet?{" "}
                    <Link
                      href="/signup"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* The button to open modal */}

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <form className="py-4 px-2">
              <label>
                Email Address:
                <input
                  type="email"
                  name="resetPasswordEmail"
                  value={credential.resetPasswordEmail}
                  onChange={handleChange}
                  id="resetPasswordEmail"
                  placeholder="youremail@gmail.com"
                  className="bg-gray-50 w-full text-gray-900 dark:text-white dark:bg-gray-500  border-gray-300 py-2 px-4 rounded-md focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required=""
                  autoComplete=""
                />
              </label>
              <button
                type="submit"
                onClick={sendEmail}
                className="float-right rounded-md mt-2 bg-blue-600 text-white py-3 px-2"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    router.push("dashboard");
  }
};

export default Login;
