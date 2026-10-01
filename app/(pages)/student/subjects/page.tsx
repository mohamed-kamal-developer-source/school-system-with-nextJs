"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { studentSubjects } from "@/services/studentApi";
import Table from "@/componentes/table";

export default function classSubjects() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");

  const dataFields = useMemo(() => {
    const tablefields = [
      { name: "subject name", sortVal: "name" },
      { name: "description" },
      { name: "type" },
    ];

    const tableRows = ["subject_name", "subject_description", "is_core"];

    return {
      tablefields: tablefields,
      tableRows: tableRows,
    };
  }, []);

  return (
    <div className="view-page">
      <PageHeader pageName={`my subjects`}>
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
        getData={studentSubjects}
      ></Table>
    </div>
  );
}
