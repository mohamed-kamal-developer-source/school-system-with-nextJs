"use client";
import { useMemo, useState } from "react";
import CreateButton from "@/componentes/createButton";
import CreateForm from "@/componentes/createForm";
import PageHeader from "@/componentes/pageHeader";
import {
  createStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
  enrollStudent,
  transferStudent,
  getAllClasses,
} from "@/services/adminApi";
import Table from "@/componentes/table";
import useFetch from "@/hooks/useFetch";
import Loading from "@/app/loading";

export default function Students() {
  const [formState, setFormState] = useState(null);
  const [transferForm, setTrasnferForm] = useState(false);
  const [enrollForm, setEnrollForm] = useState(false);
  const [students, setStudents] = useState(false);
  const [selectedStudent, setStudent] = useState("");
  const [selectedClass, setClass] = useState("");

  const dataFields = useMemo(() => {
    const createFields = [
      { name: "name", type: "text", required: true },
      { name: "email", type: "text" },
      { name: "age", type: "text" },
      { name: "phone", type: "text" },
      { name: "parent name", type: "text" },
      { name: "parent phone", type: "text" },
      { name: "password", type: "text" },
      { name: "confirm password", type: "text" },
      { name: "role", type: "text" },
    ];

    const tablefields = [
      { name: "name" },
      { name: "email" },
      { name: "age" },
      { name: "gender" },
      { name: "phone" },
    ];

    const actions = [
      { name: "update", icon: "✏️" },
      { name: "delete", icon: "🗑️" },
      { name: "view class", icon: "🏫" },
      { name: "view attendance", icon: "📋" },
      { name: "view grades", icon: "📊" },
    ];

    const tableRows = ["name", "email", "age", "gender", "phone"];

    const createReq = [
      "name",
      "email",
      "age",
      "phone",
      "parent_name",
      "parent_phone",
      "password",
      "confirmPassword",
      "role",
      "gender",
    ];

    return {
      createFields: createFields,
      tablefields: tablefields,
      createReq: createReq,
      actions: actions,
      tableRows: tableRows,
    };
  }, []);

  async function handelEnrollStudent(studentId, classId) {
    try {
      await enrollStudent({ studentId: studentId, classId: classId });
    } catch (err) {
      console.log(err);
    }
  }
  async function handelTransferStudent(studentId, classId) {
    try {
      await transferStudent({ studentId: studentId, classId: classId });
    } catch (err) {
      console.log(err);
    }
  }

  const { data: classes, loading: LoadingClasses } = useFetch(() =>
    getAllClasses(),
  );

  if (LoadingClasses) {
    return <Loading></Loading>;
  }

  return (
    <div className="admin-Students">
      <PageHeader pageName="Students">
        <CreateButton
          name="+ create Student"
          onClick={() => setFormState({ mode: "create" })}
        />
        <CreateButton
          name="transfer Student"
          onClick={() => setTrasnferForm(true)}
        />
        <CreateButton
          name="enroll Student"
          onClick={() => setEnrollForm(true)}
        />

        {formState && (
          <CreateForm
            mode={formState.mode}
            initialValues={formState.data || {}}
            submitFunc={
              formState.mode === "edit" ? updateStudent : createStudent
            }
            fields={dataFields.createFields}
            createReq={dataFields.createReq}
            onClose={() => setFormState(null)}
            id={formState.id}
            selects={[{ name: "gender", data: ["male", "female"] }]}
          />
        )}

        {(transferForm || enrollForm) && (
          <div className="create-form transfer-form">
            <select
              name=""
              id=""
              onChange={(e) => {
                setStudent(e.target.value);
              }}
            >
              {students.map((s) => {
                return <option value={s.id}>{s.name}</option>;
              })}
              select student
            </select>

            <select
              name=""
              id=""
              onChange={(e) => {
                setClass(e.target.value);
              }}
            >
              {classes.map((c) => {
                return (
                  <option
                    value={c.id}
                  >{`${c.grade_level}-${c.group_name}`}</option>
                );
              })}
              select class
            </select>

            <div className="btns">
              <button
                onClick={() => {
                  if (transferForm) {
                    setTrasnferForm(false);
                    setStudent(null);
                    setClass(null);
                  }
                  if (enrollForm) {
                    setEnrollForm(false);
                    setStudent(null);
                    setClass(null);
                  }
                }}
              >
                cancel
              </button>
              <button
                onClick={() => {
                  if (transferForm) {
                    handelTransferStudent(selectedStudent, selectedClass);
                  }
                  if (enrollForm) {
                    handelEnrollStudent(selectedStudent, selectedClass);
                  }
                }}
              >
                confirm
              </button>
            </div>
          </div>
        )}
      </PageHeader>

      <Table
        actions={dataFields.actions}
        tablefields={dataFields.tablefields}
        tableRows={dataFields.tableRows}
        getData={getAllStudents}
        deleteData={deleteStudent}
        setFormState={(data, id) => {
          setFormState({
            mode: "edit",
            data: data,
            id: id,
          });
        }}
        getDataFromTable={(data) => {
          setStudents(data);
        }}
      ></Table>
    </div>
  );
}
