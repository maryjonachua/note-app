import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const NoteCard = ({ note, setNotes }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-[#00FF9D]">
      <div className="card-body">
        <Link to={`/note/${note._id}`} className="block">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        </Link>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <Link to={`/note/${note._id}`}>
              <PenSquareIcon className="size-4 cursor-pointer" />
            </Link>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => {
                e.stopPropagation(); // ✅ Prevent card click
                setShowDeleteModal(true);
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm ">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this note?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="btn">
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(note._id);
                  setShowDeleteModal(false);
                }}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
