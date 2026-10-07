"use client";
import { useMemo, useState } from "react";
import DeleteForm from "@/componentes/deleteForm";
import {} from "@/services/adminApi";
import useFetch from "@/hooks/useFetch";
import Loading from "@/componentes/Loading";
import { usePathname, useRouter } from "next/navigation";
import Search from "./search";

export default function Table({
  actions,
  tablefields,
  getData,
  setFormState,
  tableRows,
  deleteData,
  payload,
  getDataFromTable,
  refreshKey,
}) {
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState(null);
  const [mutationVersion, setMutationVersion] = useState(0);
  const router = useRouter();
  const path = usePathname();

  function routerAction(name, page, id) {
    router.push(`${path}/${id}-${name}/${page}`);
  }

  const { data: tableData, loading: loadingData } = useFetch(
    () =>
      payload
        ? getData(payload, {
            search: search ? search : null,
            sort: sort ? sort : null,
          })
        : getData({ search: search ? search : null, sort: sort ? sort : null }),
    [search, sort, refreshKey, mutationVersion],
  );

  if (loadingData) {
    return <Loading variant="section"></Loading>;
  }

  if (getDataFromTable) {
    getDataFromTable(tableData);
  }

  return (
    <div className="page-content">
      <Search
        onSearch={(s) => {
          setSearch(s);
        }}
      ></Search>

      <div className="table" style={{ position: "relative", minHeight: 200 }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              {tablefields.map((f) => {
                return (
                  <th
                    onClick={() => {
                      if (f.sortVal) {
                        setSort(f.sortVal);
                      }
                    }}
                  >{`${f.name}${f.sortVal ? "⇅" : ""}`}</th>
                );
              })}
              <th>{actions ? "actions" : ""}</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {tableRows.map((r, k) => {
                    return <td>{d[tableRows[k]]}</td>;
                  })}
                  {actions && (
                    <td>
                      <ul className="actions">
                        {actions.map((a, k) => {
                          return (
                            <li key={k}>
                              <span
                                onClick={() => {
                                  if (a.name === "update") {
                                    setFormState(d, d.id);
                                  } else if (a.name === "delete") {
                                    setDeleteTargetId(d.id);
                                  } else {
                                    routerAction(
                                      d.name ? d.name : d.room_number,
                                      a.name.split(" ")[1],
                                      d.id,
                                    );
                                  }
                                }}
                              >
                                {a.icon}
                              </span>

                              {deleteTargetId === d.id &&
                                a.name === "delete" && (
                                  <DeleteForm
                                    onClose={() => setDeleteTargetId(null)}
                                    deleteFunc={() => deleteData(d.id)}
                                    onSuccess={() =>
                                      setMutationVersion(
                                        (version) => version + 1,
                                      )
                                    }
                                  />
                                )}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
