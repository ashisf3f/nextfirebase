import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
// import { useState, CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";
import Loader from "@/components/Loader";

const authContext = React.createContext();

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log('User detected:', user);
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // console.log('Current User:', currentUser);

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "default",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      let errorMessage = error.message;
      const startIndex = errorMessage.indexOf("(");
      const endIndex = errorMessage.indexOf(").");
      const relevantErrorMessage = errorMessage.substring(
        startIndex + 1,
        endIndex
      ); // "auth/email-already-in-use"
      const onlyErrorMessage = relevantErrorMessage.split("/")[1];
      toast.error(onlyErrorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "default",
      });
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Success", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "default",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      let errorMessage = error.message;
      const startIndex = errorMessage.indexOf("(");
      const endIndex = errorMessage.indexOf(").");
      const relevantErrorMessage = errorMessage.substring(
        startIndex + 1,
        endIndex
      ); // "auth/email-already-in-use"
      const onlyErrorMessage = relevantErrorMessage.split("/")[1];
      toast.error(onlyErrorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "default",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
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
  };
  const resetPassword = async (resetPasswordEmail) => {
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      toast.success("Password reset email sent!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "default",
      });
    } catch (error) {
      // console.log(error);  
      let errorMessage = error.message;
      const startIndex = errorMessage.indexOf("(");
      const endIndex = errorMessage.indexOf(").");
      const relevantErrorMessage = errorMessage.substring(
        startIndex + 1,
        endIndex
      ); // "auth/email-already-in-use"
      const onlyErrorMessage = relevantErrorMessage.split("/")[1];
      toast.error(onlyErrorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "default",
      });
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };

  if (loading) {
    // You can show a loading indicator here if desired
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <authContext.Provider value={value}>
        {!loading && children}
      </authContext.Provider>
      {/* <ToastContainer /> */}
    </>
  );
}
