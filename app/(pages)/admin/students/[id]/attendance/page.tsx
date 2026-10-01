"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { studentAttendanceForAdmin } from "@/services/studentApi";
import Table from "@/componentes/table";

export default function StudentAttendance() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");
  const id = pages[3].split("-")[0];

  const dataFields = useMemo(() => {
    const tablefields = [
      { name: "date" },
      { name: "status" },
      { name: "recored by" },
    ];

    const tableRows = ["attendancedate", "attendancestatus", "teachername"];

    return {
      tablefields: tablefields,
      tableRows: tableRows,
    };
  }, []);

  return (
    <div className="view-page">
      <PageHeader pageName={`${pages[pages.length - 1]} for: ${pages[3]}`}>
        <CreateButton
          name={"← Back"}
          onClick={() => {
            router.push(pages.slice(0, pages.length - 2).join("/"));
          }}
        ></CreateButton>
      </PageHeader>

      <Table
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={studentAttendanceForAdmin}
        payload={{ studentId: id }}
      ></Table>
    </div>
  );
}
