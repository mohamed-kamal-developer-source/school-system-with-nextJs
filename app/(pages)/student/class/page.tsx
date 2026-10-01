"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { getStudentClass } from "@/services/studentApi";
import Table from "@/componentes/table";

export default function studentClass() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");

  const dataFields = useMemo(() => {
    const tablefields = [
      { name: "grade", sortVal: "name" },
      { name: "group" },
      { name: "room" },
      { name: "academic year" },
      { name: "status" },
    ];

    const tableRows = [
      "grade_level",
      "group_name",
      "room_number",
      "academic_year",
      "active",
    ];

    return {
      tablefields: tablefields,
      tableRows: tableRows,
    };
  }, []);

  return (
    <div className="view-page">
      <PageHeader pageName={`my class`}>
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
        getData={getStudentClass}
      ></Table>
    </div>
  );
}
