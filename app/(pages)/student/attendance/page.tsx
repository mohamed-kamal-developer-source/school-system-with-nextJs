"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { studentAttendance } from "@/services/studentApi";
import Table from "@/componentes/table";

export default function StudentAttendance() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");
  console.log(pages);

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
      <PageHeader pageName={`my attendance`}>
        <CreateButton
          name={"← Back"}
          onClick={() => {
            router.push(pages.slice(0,1).join("/"));
          }}
        ></CreateButton>
      </PageHeader>

      <Table
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={studentAttendance}
      ></Table>
    </div>
  );
}
