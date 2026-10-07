"use client";

import { ChangeEvent, useState } from "react";

type ExcelUploadFormProps = {
  title: string;
  requiredColumns: string[];
  submitFunc: (file: File) => Promise<unknown>;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function ExcelUploadForm({
  title,
  requiredColumns,
  submitFunc,
  onClose,
  onSuccess,
}: ExcelUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    setError(null);
  }

  async function handleUpload() {
    if (!file) {
      setError("Choose an Excel file first.");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      await submitFunc(file);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to upload the file.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="create-form excel-upload-form" role="dialog" aria-modal="true">
      <div className="fields">
        <h2>{title}</h2>
        <p className="excel-upload-help">
          Upload an .xlsx or .xls file. The first row must contain these columns:
        </p>
        <p className="excel-columns">{requiredColumns.join(", ")}</p>
        <input
          type="file"
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {file && <p className="excel-file-name">Selected: {file.name}</p>}
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="actions">
        <button className="cancel" onClick={onClose} disabled={uploading}>
          cancel
        </button>
        <button className="create" onClick={handleUpload} disabled={uploading}>
          {uploading ? "uploading..." : "upload Excel"}
        </button>
      </div>
    </div>
  );
}
