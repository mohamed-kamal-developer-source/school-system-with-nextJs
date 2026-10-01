"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import Table from "@/componentes/table";
import { studentGrades } from "@/services/studentApi";

export default function StudentGrades() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");
  const id = pages[3].split("-")[0];

  const dataFields = useMemo(() => {
    const tablefields = [
      { name: "student" },
      { name: "subject" },
      { name: "score" },
      { name: "max" },
      { name: "%" },
      { name: "teacher" },
    ];

    const tableRows = [
      "student_name",
      "subject_name",
      "score",
      "max_score",
      "percentage",
      "teacher_name",
    ];

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
        getData={studentGrades}
        payload={id}
      ></Table>
    </div>
  );
}
