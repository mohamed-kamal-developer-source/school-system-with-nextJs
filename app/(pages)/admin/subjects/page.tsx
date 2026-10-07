"use client";
import { useMemo, useState } from "react";
import CreateButton from "@/componentes/createButton";
import CreateForm from "@/componentes/createForm";
import PageHeader from "@/componentes/pageHeader";
import {
  createSubject,
  updateSubject,
  getAllSubjects,
  deleteSubject,
} from "@/services/adminApi";
import Table from "@/componentes/table";

export default function Subjects() {
  const [formState, setFormState] = useState(null);
  const [tableKey, setTableKey] = useState(0);

  const dataFields = useMemo(() => {
    const createFields = [
      { name: "subject name", type: "text", required: true },
      { name: "description", type: "text" },
    ];

    const tablefields = [
      { name: "subject name", sortVal: "name" },
      { name: "description" },
      { name: "type" },
    ];

    const actions = [
      { name: "update", icon: "✏️" },
      { name: "delete", icon: "🗑️" },
      { name: "view classes", icon: "🏫" },
      { name: "view teachers", icon: "👨‍🏫" },
    ];

    const tableRows = ["name", "description", "is_core"];

    const createReq = ["name", "description", "isCore"];

    return {
      createFields: createFields,
      createReq: createReq,
      tablefields: tablefields,
      actions: actions,
      tableRows: tableRows,
    };
  }, []);

  return (
    <div className="admin-subjects">
      <PageHeader pageName="subjects">
        <CreateButton
          name="+ create subject"
          onClick={() => setFormState({ mode: "create" })}
        />

        {formState && (
          <CreateForm
            mode={formState.mode}
            initialValues={formState.data || {}}
            submitFunc={
              formState.mode === "edit" ? updateSubject : createSubject
            }
            fields={dataFields.createFields}
            onClose={() => setFormState(null)}
            onSuccess={() => setTableKey((key) => key + 1)}
            createReq={dataFields.createReq}
            id={formState.id}
          />
        )}
      </PageHeader>

      <Table
        refreshKey={tableKey}
        actions={dataFields.actions}
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={getAllSubjects}
        deleteData={deleteSubject}
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
