import TaskCard from "./TaskCard.jsx";

const STATUS_LABELS = {
    pending: "To Do",
    started: "In Progress",
    completed: "Done",
};

const EMPTY_MESSAGES = {
    pending: "No tasks waiting to start",
    started: "Nothing in progress",
    completed: "No completed tasks yet",
};

function TaskColumn({ status, tasks, onEdit, onDelete }) {
    return (
        <div className="kanban-column">

            <div
                className={`kanban-column-header kanban-column-header-${status}`}
            >
                <div className="kanban-column-heading">
                    <span
                        className={`kanban-column-status-dot ${status}`}
                    ></span>

                    <h3 className="kanban-column-title">
                        {STATUS_LABELS[status]}
                    </h3>
                </div>

                <span className="kanban-column-count">
                    {tasks.length}
                </span>
            </div>

            <div className="kanban-column-body">

                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <div className="kanban-empty-state">

                        <div className="kanban-empty-icon">
                            {status === "pending" && "○"}
                            {status === "started" && "◐"}
                            {status === "completed" && "✓"}
                        </div>

                        <p className="kanban-empty-title">
                            {EMPTY_MESSAGES[status]}
                        </p>

                        <span className="kanban-empty-text">
                            Tasks will appear here
                        </span>

                    </div>
                )}

            </div>
        </div>
    );
}

export default TaskColumn;