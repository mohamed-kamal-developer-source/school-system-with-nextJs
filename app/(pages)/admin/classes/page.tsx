"use client";
import { useMemo, useState } from "react";
import CreateButton from "@/componentes/createButton";
import CreateForm from "@/componentes/createForm";
import PageHeader from "@/componentes/pageHeader";
import DeleteForm from "@/componentes/deleteForm";
import {
  createClass,
  updateClass,
  getAllClasses,
  deleteClass,
} from "@/services/adminApi";
import Table from "@/componentes/table";

export default function classes() {
  const [formState, setFormState] = useState(null);

  const dataFields = useMemo(() => {
    const createFields = [
      { name: "grade Level", type: "text", required: true },
      { name: "group Name", type: "text", required: true },
      { name: "Academic Year", type: "text", required: true },
      { name: "Room Number", type: "text", required: true },
    ];

    const createReq = ["gradeLevel", "groupName", "academicYear", "roomNumber"];

    const tablefields = [
      { name: "grade", sortVal: "name" },
      { name: "group" },
      { name: "room" },
      { name: "academic year" },
      { name: "status" },
    ];

    const actions = [
      { name: "update", icon: "✏️" },
      { name: "delete", icon: "🗑️" },
      { name: "view students", icon: "👨‍🎓" },
      { name: "view teachers", icon: "👨‍🏫" },
      { name: "view subjects", icon: "📚" },
      { name: "view attendance", icon: "📋" },
      { name: "view grades", icon: "📊" },
      { name: "view class_Subjects", icon: "📝" },
    ];

    const tableRows = [
      "grade_level",
      "group_name",
      "room_number",
      "academic_year",
      "active",
    ];

    return {
      createFields: createFields,
      tablefields: tablefields,
      createReq:createReq,
      actions: actions,
      tableRows: tableRows,
    };
  }, []);

  return (
    <div className="admin-classes">
      <PageHeader pageName="classes">
        <CreateButton
          name="+ create class"
          onClick={() => setFormState({ mode: "create" })}
        />

        {formState && (
          <CreateForm
            mode={formState.mode}
            initialValues={formState.data || {}}
            submitFunc={formState.mode === "edit" ? updateClass : createClass}
            fields={dataFields.createFields}
            createReq={dataFields.createReq}
            onClose={() => setFormState(null)}
            selects={[{ name: "status", data: ["active", "inactive"] }]}
            id={formState.id}
          />
        )}
      </PageHeader>

      <Table
        actions={dataFields.actions}
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={getAllClasses}
        deleteData={deleteClass}
        setFormState={(data, id) => {
          setFormState({
            mode: "edit",
            data: data,
            id: id,
          });
        }}
      ></Table>
    </div>
  );
}
