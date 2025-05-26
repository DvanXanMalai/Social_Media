const CreatePostModal = () => {
  return (
    <div className="flex flex-col p-6">
      <p className="font-bold mb-4">What's on your mind?</p>
      <button
        className="btn btn-primary w-sm"
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        Create Post
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreatePostModal;
