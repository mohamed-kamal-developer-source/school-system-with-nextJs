// // app/providers/LoadingProvider.tsx
// "use client";
// import { createContext, useContext, useState } from "react";

// const LoadingContext = createContext<{
//   loading: boolean;
//   setLoading: (v: boolean) => void;
// }>({ loading: false, setLoading: () => {} });

// export function LoadingProvider({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(false);

//   return (
//     <LoadingContext.Provider value={{ loading, setLoading }}>
//       {children}
//       {loading && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 50,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "rgba(0,0,0,0.3)",
//           }}
//         >
//           <div
//             style={{
//               width: 40,
//               height: 40,
//               border: "4px solid #d1d5db",
//               borderTopColor: "#2563eb",
//               borderRadius: "50%",
//               animation: "spin 0.8s linear infinite",
//             }}
//           />
//           <style>{`
//       @keyframes spin {
//         to { transform: rotate(360deg); }
//       }
//     `}</style>
//         </div>
//       )}
//     </LoadingContext.Provider>
//   );
// }

// export const useLoading = () => useContext(LoadingContext);
