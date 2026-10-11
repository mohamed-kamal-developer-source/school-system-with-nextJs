"use client";

import { useAuth } from "@/contexts/authContext";
import { dataObj } from "../data";
import { icons } from "../data";
import { adminDashboard } from "@/services/adminApi";
import { studentDashboard } from "@/services/studentApi";
import { teacherClassesForDashboard } from "@/services/teacherApi";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function dashboard() {
  const router = useRouter();

  const funcsMap = {
    admin: adminDashboard,
    student: studentDashboard,
    teacher: teacherClassesForDashboard,
  };

  const { user } = useAuth();

  const pages = user ? dataObj[user.role] : [];

  const { data: dashboard } = useFetch(funcsMap[user?.role], [user?.role]);

  return (
    <div className="dashboard">
      <div className="head">
        <h1>Welcome, {user?.name}</h1>
      </div>
      <div className="data">
        {pages.map((p) => {
          return (
            <div
              key={p}
              className="box"
              onClick={() => {
                router.push(`/${user?.role}/${p}`);
              }}
            >
              <p>{icons[p]}</p>
              <p>
                {user?.role === "teacher"
                  ? dashboard?.classes.length
                  : dashboard?.data[p]}
              </p>
              <p>{user?.role === "admin" ? `total ${p}` : `my ${p}`} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
