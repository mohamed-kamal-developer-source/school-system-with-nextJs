"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  addGrade,
  deleteGrade,
  teacherGradesForClass,
  updateGrade,
  importGrades,
} from "@/services/teacherApi";
import Table from "@/componentes/table";
import useFetch from "@/hooks/useFetch";
import { getclassStudents } from "@/services/classesApi";
import Loading from "@/componentes/Loading";
import CreateForm from "@/componentes/createForm";
import ExcelUploadForm from "@/componentes/excelUploadForm";

export default function classGrades() {
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
    const createFields = [
      { name: "score", type: "text", required: true },
      { name: "max score", type: "text", required: true },
      { name: "date", type: "date", required: true }
    ];

    const tablefields = [
      { name: "student" },
      { name: "subject" },
      { name: "score" },
      { name: "max" },
      { name: "%" },
    ];

    const actions = [
      { name: "update", icon: "✏️" },
      { name: "delete", icon: "🗑️" },
    ];

    const tableRows = [
      "student_name",
      "subject_name",
      "score",
      "max_score",
      "percentage",
    ];

    const createReq = ["score","maxScore","recordedAt"]
    
    return {
      tablefields: tablefields,
      createFields: createFields,
      createReq:createReq,
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
          name="+ add grade"
          onClick={() => setFormState({ mode: "create" })}
        />
        <CreateButton
          name="Import Grades Excel"
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
            submitFunc={formState.mode === "edit" ? updateGrade : addGrade}
            fields={dataFields.createFields}
             createReq={dataFields.createReq}
            onClose={() => setFormState(null)}
            onSuccess={() => setTableKey((key) => key + 1)}
            selects={[
              { name: "student", data: studentsName },
              {
                name: "exam type",
                data: ["quiz", "midterm", "final", "assignment", "Project"],
              },
            ]}
            id={formState.id}
          />
        )}

        {showExcelUpload && (
          <ExcelUploadForm
            title="Import grades from Excel"
            requiredColumns={["student_id", "exam_type", "score", "max_score"]}
            submitFunc={importGrades}
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
          getData={teacherGradesForClass}
          deleteData={deleteGrade}
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
