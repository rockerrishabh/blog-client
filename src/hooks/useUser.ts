import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("usePost must be used within a PostProvider");

  return context;
};
