export default function DeleteForm({ onClose,deleteFunc }) {

    async function submitDelete() {
        try {
            await deleteFunc()
        } catch (error) {
            
        }
    }

  return (
    <div className="delete-form">
      <div className="head">
        <h2>Confirm delete</h2>
        <p>X</p>
      </div>
      <p className="message">Are you sure you want to delete this item?</p>
      <div className="btns">
        <button
          className="cancel"
          onClick={onClose}
        >
          cancel
        </button>
        <button className="confirm" onClick={()=> {
            submitDelete()
        }}>confirm</button>
      </div>
    </div>
  );
}
