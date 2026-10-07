"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getclassAttendance, getclassStudents } from "@/services/classesApi";
import Table from "@/componentes/table";
import {
  addAttendance,
  deleteAttendance,
  updateAttendance,
  importAttendance,
} from "@/services/teacherApi";
import CreateForm from "@/componentes/createForm";
import useFetch from "@/hooks/useFetch";
import classStudents from "../students/page";
import Loading from "@/componentes/Loading";
import ExcelUploadForm from "@/componentes/excelUploadForm";

export default function classAttendance() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");
  const id = pages[3].split("-")[0];

  const [date, setDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [formState, setFormState] = useState(null);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const dataFields = useMemo(() => {
    const createFields = [{ name: "date", type: "date", required: true }];

    const tablefields = [
      { name: "student", sortVal: "name" },
      { name: "status" },
    ];
    const actions = [
      { name: "update", icon: "✏️" },
      { name: "delete", icon: "🗑️" },
    ];

    const tableRows = ["student_name", "attendance_status"];

    const createReq = ["weelyHours"];

    return {
      createFields: createFields,
      tablefields: tablefields,
      createReq: createReq,
      actions: actions,
      tableRows: tableRows,
    };
  }, []);

  const { data: students, loading: loading } = useFetch(() =>
    getclassStudents(id),
  );

  if (loading) {
    return <Loading></Loading>;
  }

  const studentsName = [];

  students?.map((s) => {
    studentsName.push(s.student_name);
  });

  return (
    <div className="view-page">
      <PageHeader pageName={`${pages[pages.length - 1]} for: ${pages[3]}`}>
        <CreateButton
          name="+ add attendance"
          onClick={() => setFormState({ mode: "create" })}
        />
        <CreateButton
          name="Import Attendance Excel"
          onClick={() => setShowExcelUpload(true)}
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
              formState.mode === "edit" ? updateAttendance : addAttendance
            }
            fields={dataFields.createFields}
            onClose={() => setFormState(null)}
            onSuccess={() => setTableKey((key) => key + 1)}
            createReq={dataFields.createReq}
            selects={[
              { name: "student", data: studentsName },
              {
                name: "status",
                data: ["present", "late", "apsent", "excused"],
              },
            ]}
            id={formState.id}
          />
        )}

        {showExcelUpload && (
          <ExcelUploadForm
            title="Import attendance from Excel"
            requiredColumns={["student_id", "status"]}
            submitFunc={importAttendance}
            onClose={() => setShowExcelUpload(false)}
            onSuccess={() => setTableKey((key) => key + 1)}
          />
        )}
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
          key={`${selectedDate}-${tableKey}`}
          actions={dataFields.actions}
          tablefields={dataFields.tablefields}
          tableRows={dataFields.tableRows}
          getData={getclassAttendance}
          deleteData={deleteAttendance}
          payload={{ classId: id, day: selectedDate }}
          setFormState={(data, id) => {
            setFormState({
              mode: "edit",
              data: data,
              id: id,
            });
          }}
        ></Table>
      )}
    </div>
  );
}
