export default function DeleteForm({ onClose, deleteFunc, onSuccess }) {

    async function submitDelete() {
        try {
            await deleteFunc()
            onSuccess?.()
            onClose()
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
