export default function PageHeader({ pageName, children }) {
  return (
    <div className="page-header">
      <h2>{pageName}</h2>
      <div className="btns">{children}</div>
    </div>
  );
}