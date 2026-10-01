"use client";
import { useMemo, useState } from "react";
import CreateButton from "@/componentes/createButton";
import CreateForm from "@/componentes/createForm";
import PageHeader from "@/componentes/pageHeader";
import {
  createTeacher,
  updateTeacher,
  getAllTeachers,
  deleteTeacher,
  getAllSubjects,
} from "@/services/adminApi";
import Table from "@/componentes/table";
import useFetch from "@/hooks/useFetch";
import Loading from "@/app/loading";

export default function Teachers() {
  const [formState, setFormState] = useState(null);

  const dataFields = useMemo(() => {
    const createFields = [
      { name: "name", type: "text", required: true },
      { name: "email", type: "text" },
      { name: "password", type: "text" },
      { name: "confirm password", type: "text" },
      { name: "role", type: "text" },
    ];

    const tablefields = [
      { name: "name" },
      { name: "email" },
      { name: "subject" },
      { name: "hire date" },
      { name: "class name" },
    ];

    const actions = [
      { name: "update", icon: "✏️" },
      { name: "delete", icon: "🗑️" },
      { name: "view classes", icon: "🏫" },
    ];

    const tableRows = ["name", "email", "subject_name", "hire_date"];

    const createReq = [
      "name",
      "email",
      "subject",
      "password",
      "confirmPassword",
      "role",
    ];

    return {
      createFields: createFields,
      tablefields: tablefields,
      createReq: createReq,
      actions: actions,
      tableRows: tableRows,
    };
  }, []);

  const { data: subjects, loading: loading } = useFetch(() => getAllSubjects());

  if (loading) {
    return <Loading></Loading>;
  }

  const subjectsName = [];

  subjects?.map((s) => {
    subjectsName.push(s.name);
  });

  return (
    <div className="admin-Teachers">
      <PageHeader pageName="Teachers">
        <CreateButton
          name="+ create Teacher"
          onClick={() => setFormState({ mode: "create" })}
        />

        {formState && (
          <CreateForm
            mode={formState.mode}
            initialValues={formState.data || {}}
            submitFunc={
              formState.mode === "edit" ? updateTeacher : createTeacher
            }
            fields={dataFields.createFields}
            createReq={dataFields.createReq}
            onClose={() => setFormState(null)}
            id={formState.id}
          />
        )}
      </PageHeader>

      <Table
        actions={dataFields.actions}
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={getAllTeachers}
        deleteData={deleteTeacher}
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
