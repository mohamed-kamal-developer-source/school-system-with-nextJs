"use client";
import { useState, useEffect } from "react";

export default function CreateForm({
  mode = "create", // "create" أو "edit"
  initialValues = {},
  submitFunc, // بدل createFunc، اسم أعم يشمل create/update
  fields,
  selects,
  onClose,
  createReq,
  id,
  onSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setFormError(null);
  }, [initialValues]);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function validate() {
    const newErrors = {};

    createReq.forEach((key, i) => {
      const f = fields[i];
      const value = String(values[key] ?? "").trim();

      if (f.required && !value) {
        newErrors[key] = `${f.name} is required`;
        return;
      }

      if (value && f.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        newErrors[key] = "invalid email format";
      }

      if (value && f.type === "number" && isNaN(Number(value))) {
        newErrors[key] = "must be a number";
      }
    });

    selects?.forEach((s) => {
      if (s.required && !values[s.name]) {
        newErrors[s.name] = `${s.name} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit() {
    setFormError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (mode === "create") {
        await submitFunc(values);
      } else {
        await submitFunc(id, values);
      }
      if (mode === "create") setValues({});
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="create-form">
      <div className="fields">
        <ul>
          {createReq.map((key, i) => (
            <>
              {fields[i] && (
                <li className="field" key={key}>
                  <p>{fields[i].name}</p>
                  <input
                    type={fields[i].type}
                    value={values[key] ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    disabled={submitting}
                  />
                  {errors[key] && (
                    <span className="field-error">{errors[key]}</span>
                  )}
                </li>
              )}
            </>
          ))}

          {selects &&
            selects.map((s) => (
              <li className="field field-select" key={s.name}>
                <p>{`select ${s.name}`}</p>
                <select
                  value={values[s.name] ?? ""}
                  onChange={(e) => handleChange(s.name, e.target.value)}
                  disabled={submitting}
                >
                  <option value="">-- select --</option>
                  {s.data.map((d) => (
                    <option value={d} key={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors[s.name] && (
                  <span className="field-error">{errors[s.name]}</span>
                )}
              </li>
            ))}
        </ul>
      </div>

      {formError && <p className="form-error">{formError}</p>}

      <div className="actions">
        <button className="cancel" onClick={onClose} disabled={submitting}>
          cancel
        </button>
        <button className="create" onClick={onSubmit} disabled={submitting}>
          {submitting
            ? mode === "edit"
              ? "saving..."
              : "creating..."
            : mode === "edit"
              ? "save"
              : "create"}
        </button>
      </div>
    </div>
  );
}
