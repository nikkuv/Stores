// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from '../lib/firebase';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged((user) => {

//   //     if (user) {
//   //       setUser(user);
//   //     } else {
//   //       setUser(null);
//   //     }
//   //   });

//   //   // Cleanup the subscription when the component is unmounted
//   //   return () => unsubscribe();
//   // }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       console.log(user);
//       {children}
//     </AuthContext.Provider>
//   );
// };
