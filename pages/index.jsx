import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const {loading, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(currentUser)
    if (!loading) {
      if (currentUser) {
        router.push("dashboard");
      } else {
        router.push("login");
      }
    }
  }, [loading, currentUser, router]);

  return <></>;
};


export default Home;
