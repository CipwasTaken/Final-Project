import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ userId, setUserId, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};