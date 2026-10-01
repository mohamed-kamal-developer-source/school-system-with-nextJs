"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getclassAttendance } from "@/services/classesApi";
import Table from "@/componentes/table";

export default function classAttendance() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");
  const id = pages[3].split("-")[0];

  const [date, setDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const dataFields = useMemo(() => {
    const tablefields = [
      { name: "student", sortVal: "name" },
      { name: "status" },
    ];

    const tableRows = ["student_name", "attendance_status"];

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

      <div className="select-to-load">
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setSelectedDate(date);
          }}
        >
          select
        </button>
      </div>

      {selectedDate && (
        <Table
        key={selectedDate}
          tablefields={dataFields.tablefields}
          tableRows={dataFields.tableRows}
          getData={getclassAttendance}
          payload={{ classId: id, day: selectedDate }}
        ></Table>
      )}
    </div>
  );
}
