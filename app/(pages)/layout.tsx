"use client";

import { useAuth } from "@/contexts/authContext";
import { dataObj } from "./data";
import { icons } from "./data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false);
  
  const { user,logOut} = useAuth();

  const pages = user ? dataObj[user.role] : [];

  return (
    <>
      <div className="header">
        <p style={{ display: "inline", marginRight: "15px" }}>{user?.name}</p>
        <span className="role">{user?.role}</span>
      </div>

      <div className="sideBar">
        <div className="head">
          <h2>SMS</h2>
        </div>

        <div className="pages">
          <ul>
            <li onClick={()=> {
              router.push(`/dashboard`);
            }}>🏠 dashboard</li>
            {pages.map((p,i) => (
              <li key={i}
                onClick={() => {
                  router.push(`/${user?.role}/${p}`);
                }}
              >
                <p>{icons[p]}</p>
                <p>{user?.role === "admin" ? `${p}` : `my ${p}`} </p>
              </li>
            ))}
          </ul>
        </div>

            <div className="logout">
            <button
              disabled={loggingOut}
              onClick={async () => {
                setLoggingOut(true);
                try {
                  await logOut();
                  router.replace("/login");
                  router.refresh();
                } finally {
                  setLoggingOut(false);
                }
              }}
            >
              {loggingOut ? "logging out..." : "logout"}
            </button>
            </div>

      </div>

      <div className="page">
        {children}
      </div>
    </>
  );
}
