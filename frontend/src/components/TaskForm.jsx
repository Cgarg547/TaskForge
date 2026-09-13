import { useState, useEffect } from "react";

function TaskForm({ task, onSubmit, onCancel, saving = false }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");

    const isEditing = !!task;

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setStatus(task.status);
        } else {
            setTitle("");
            setDescription("");
            setStatus("pending");
        }
    }, [task]);

    function handleSubmit(e) {
        e.preventDefault();

        if (saving || !title.trim()) {
            return;
        }

        onSubmit({
            title: title.trim(),
            description: description.trim() || null,
            status,
        });
    }

    return (
        <div
            className="modal-overlay"
            onClick={saving ? undefined : onCancel}
        >
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Modal Header */}
                <div className="modal-header">

                    <div>
                        <div className="modal-eyebrow">
                            Workspace
                        </div>

                        <h2 className="modal-title">
                            {isEditing
                                ? "Edit Task"
                                : "Create New Task"}
                        </h2>

                        <p className="modal-subtitle">
                            {isEditing
                                ? "Update the details of this task."
                                : "Add a new task to your team's workspace."}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onCancel}
                        disabled={saving}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Title */}
                    <div className="form-group">

                        <label
                            className="form-label"
                            htmlFor="title"
                        >
                            Task title
                        </label>

                        <input
                            id="title"
                            type="text"
                            className="form-input"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="e.g. Build dashboard analytics"
                            autoFocus
                            maxLength={255}
                            disabled={saving}
                        />

                        <span className="form-hint">
                            Give your task a clear, descriptive name.
                        </span>

                    </div>


                    {/* Description */}
                    <div className="form-group">

                        <label
                            className="form-label"
                            htmlFor="description"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            className="form-textarea"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Describe what needs to be done..."
                            rows={5}
                            maxLength={5000}
                            disabled={saving}
                        />

                        <span className="form-hint">
                            Add any details your team needs.
                        </span>

                    </div>


                    {/* Status */}
                    <div className="form-group">

                        <label
                            className="form-label"
                            htmlFor="status"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            className="form-select"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            disabled={saving}
                        >
                            <option value="pending">
                                To Do
                            </option>

                            <option value="started">
                                In Progress
                            </option>

                            <option value="completed">
                                Completed
                            </option>
                        </select>

                    </div>


                    {/* Actions */}
                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={onCancel}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving || !title.trim()}
                        >
                            {saving ? (
                                <>
                                    <span className="button-spinner"></span>
                                    {isEditing
                                        ? "Saving..."
                                        : "Creating..."}
                                </>
                            ) : (
                                isEditing
                                    ? "Save Changes"
                                    : "Create Task"
                            )}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default TaskForm;