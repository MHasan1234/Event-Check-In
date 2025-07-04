// // src/context/AuthContext.jsx
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const storedToken = localStorage.getItem("token");
//   const storedUser = localStorage.getItem("user");

//   const [token, setToken] = useState(storedToken || "");
//   const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

//   const login = (token, user) => {
//     setToken(token);
//     setUser(user);
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//   };

//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
