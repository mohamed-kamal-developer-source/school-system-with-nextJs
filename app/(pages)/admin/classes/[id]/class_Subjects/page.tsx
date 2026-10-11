"use client";
import { useMemo, useState } from "react";
import CreateButton from "@/componentes/createButton";
import CreateForm from "@/componentes/createForm";
import PageHeader from "@/componentes/pageHeader";
import {
  createClassSubject,
  updateClassSubjects,
  getAllClassSubjects,
  deleteClassSubjects,
} from "@/services/adminApi";
import Table from "@/componentes/table";
import useFetch from "@/hooks/useFetch";
import { getclassTeachers } from "@/services/classesApi";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";

export default function class_Subjects() {
  const [formState, setFormState] = useState(null);
  const [tableKey, setTableKey] = useState(0);
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");
  const id = pages[3].split("-")[0];

  const dataFields = useMemo(() => {
    const createFields = [
      { name: "weely hours", type: "number", required: true },
    ];

    const tablefields = [
      { name: "subject", sortVal: "name" },
      { name: "teacher" },
      { name: "weekly hours" },
    ];

    const actions = [
      { name: "update", icon: "✏️" },
      { name: "delete", icon: "🗑️" },
    ];

    const tableRows = ["subject_name", "teacher_name", "weekly_hours"];

    const createReq = ["weelyHours"]

    return {
      createFields: createFields,
      tablefields: tablefields,
      createReq:createReq,
      actions: actions,
      tableRows: tableRows,
    };
  }, []);

  const { data: teachers, loading: loading } = useFetch(() =>
    getclassTeachers(id),
  );



  const teachersName = [];

  teachers?.map((t) => {
    teachersName.push(t.teacher_name);
  });


  return (
    <div className="admin-subjects">
      <PageHeader pageName="subjects">
        <CreateButton
          name="+ Add Subject to Class"
          onClick={() => setFormState({ mode: "create" })}
        />

        <CreateButton
          name={"← Back"}
          onClick={() => {
            router.push(pages.slice(0, pages.length - 2).join("/"));
          }}
        ></CreateButton>

        {formState && (
          <CreateForm
            mode={formState.mode}
            initialValues={formState.data || {}}
            submitFunc={
              formState.mode === "edit"
                ? updateClassSubjects
                : createClassSubject
            }
            fields={dataFields.createFields}
            onClose={() => setFormState(null)}
            onSuccess={() => setTableKey((key) => key + 1)}
            createReq={dataFields.createReq}
            id={formState.id}
            selects={[{ name: "select teacher", data: teachersName }]}
          />
        )}
      </PageHeader>

      <Table
        refreshKey={tableKey}
        actions={dataFields.actions}
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={getAllClassSubjects}
        deleteData={deleteClassSubjects}
        payload={id}
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
