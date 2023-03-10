import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { logout, currentUser } = useAuth();
  // console.log(currentUser);
  const router = useRouter();
  const handleClick = () => {
    if (currentUser) {
      logout(auth);
      router.push("/login");
    }
  };
  if (currentUser) {
    // User is logged in, render component
    return (
      <>
        <Head>
          <title>Asisf2f | Home</title>
        </Head>

        <div className="dark:bg-gray-900 min-h-screen text-center pt-28 bg-gray-50 ">
          <h1>
            Welcome {currentUser.email}!
            <p className="text-red-600">This web page is under construction</p>
            visit{" "}
            <a
              href="https://ashiskunwar.com.np"
              className="dark:text-white text-black"
            >
              ashisf2f
            </a>{" "}
            for more info
          </h1>
          <button
            onClick={handleClick}
            className="btn bg-red-400 text-white hover:bg-red-800"
          >
            Logout
          </button>
        </div>
      </>
    );
  } else {
    // User is not logged in, render login form
    router.push("login");
  }
};

export default Dashboard;
