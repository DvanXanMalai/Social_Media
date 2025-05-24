import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-6 h-screen flex justify-center items-center">
      <h1 className="text-2xl justify-center font-bold">
        Welcome to Mini Social Media 🚀
      </h1>
    </div>
  );
}

export default Home;
