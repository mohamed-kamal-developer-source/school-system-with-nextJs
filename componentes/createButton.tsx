"use client";

export default function CreateButton({ name, onClick }) {
  return (
    <div className="create-btn">
      <button onClick={onClick}>{name}</button>
    </div>
  );
}