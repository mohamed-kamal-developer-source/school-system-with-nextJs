"use client";

import CreateButton from "@/componentes/createButton";
import PageHeader from "@/componentes/pageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getclassGrades } from "@/services/classesApi";
import Table from "@/componentes/table";
import useFetch from "@/hooks/useFetch";
import { getAllSubjects } from "@/services/adminApi";
import Loading from "@/app/loading";

export default function classGrades() {
  const router = useRouter();
  const path = usePathname();
  const pages = path.split("/");
  const id = pages[3].split("-")[0];

  const [subject, setSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

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

  const { data: subjects, loading: loading } = useFetch(() => getAllSubjects());




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
        <select
          name=""
          id=""
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        >
          select subject
          {subjects?.map((s) => {
            return <option value={s.id}>{s.name}</option>;
          })}
        </select>
        <button
          onClick={() => {
            setSelectedSubject(subject);
          }}
        >
          select
        </button>
      </div>

      {selectedSubject && (
        <Table
          key={selectedSubject}
          tablefields={dataFields.tablefields}
          tableRows={dataFields.tableRows}
          getData={getclassGrades}
          payload={{ classId: id, subjectId: selectedSubject }}
        ></Table>
      )}
    </div>
  );
}
