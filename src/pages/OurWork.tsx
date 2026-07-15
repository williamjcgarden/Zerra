import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OurWork = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/#our-work", { replace: true });
  }, [navigate]);

  return null;
};

export default OurWork;
