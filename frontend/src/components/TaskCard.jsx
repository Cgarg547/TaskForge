const STATUS_LABELS = {
    pending: "To Do",
    started: "In Progress",
    completed: "Completed",
};

function formatTaskDate(dateString) {
    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("en-CA", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

function TaskCard({ task, onEdit, onDelete }) {
    const canEdit = !!onEdit;
    const canDelete = !!onDelete;

    const createdAt = formatTaskDate(task.created_at);
    const updatedAt = formatTaskDate(task.updated_at);

    const statusLabel =
        STATUS_LABELS[task.status] || task.status;

    return (
        <div
            className={`task-card ${
                canEdit ? "task-card-clickable" : ""
            }`}
            onClick={
                canEdit
                    ? () => onEdit(task)
                    : undefined
            }
        >

            {/* Card Header */}
            <div className="task-card-header">

                <div className="task-card-title-row">

                    <span
                        className={`task-card-status-dot ${task.status}`}
                    ></span>

                    <h4 className="task-card-title">
                        {task.title}
                    </h4>

                </div>

                {canDelete && (
                    <button
                        type="button"
                        className="task-card-btn task-card-btn-delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }}
                        title="Delete Task"
                        aria-label={`Delete ${task.title}`}
                    >
                        ×
                    </button>
                )}

            </div>


            {/* Status */}
            <div className="task-card-status">
                {statusLabel}
            </div>


            {/* Description */}
            {task.description && (
                <p className="task-card-description">
                    {task.description}
                </p>
            )}


            {/* Metadata */}
            <div className="task-card-meta">

                {createdAt && (
                    <div className="task-card-date">

                        <span className="task-card-date-label">
                            Created
                        </span>

                        <span className="task-card-date-value">
                            {createdAt}
                        </span>

                    </div>
                )}

                {updatedAt &&
                    updatedAt !== createdAt && (
                        <div className="task-card-date">

                            <span className="task-card-date-label">
                                Updated
                            </span>

                            <span className="task-card-date-value">
                                {updatedAt}
                            </span>

                        </div>
                    )}

            </div>

        </div>
    );
}

export default TaskCard;