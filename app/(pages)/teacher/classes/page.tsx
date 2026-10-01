"use client";
import { useMemo } from "react";
import PageHeader from "@/componentes/pageHeader";
import { teacherClasses } from "@/services/teacherApi";
import Table from "@/componentes/table";

export default function classes() {
  const dataFields = useMemo(() => {

    const tablefields = [
      { name: "grade", sortVal: "name" },
      { name: "group" },
      { name: "room" },
      { name: "academic year" },
      { name: "status" },
    ];

    const actions = [
      { name: "view students", icon: "👨‍🎓" },
      { name: "view attendance", icon: "📋" },
      { name: "view grades", icon: "📊" },
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
      actions: actions,
      tableRows: tableRows,
    };
  }, []);

  return (
    <div className="admin-classes">
      <PageHeader pageName="my classes"></PageHeader>

      <Table
        actions={dataFields.actions}
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={teacherClasses}
      ></Table>
    </div>
  );
}
