import { useState } from "react";
import { useOrganization } from "@clerk/clerk-react";
import TaskColumn from "./TaskColumn.jsx";
import { createTask, updateTask, deleteTask } from "../services/api";
import TaskForm from "./TaskForm.jsx";

const STATUSES = ["pending", "started", "completed"];

function KanbanBoard({ tasks, setTasks, getToken }) {
    const { membership } = useOrganization();

    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deletingTaskId, setDeletingTaskId] = useState(null);
    const [actionError, setActionError] = useState(null);

    const role = membership?.role;

    const canManage =
        role === "org:admin" ||
        role === "org:editor";

    function getTasksByStatus(status) {
        return tasks.filter(
            (task) => task.status === status
        );
    }

    function handleEdit(task) {
        if (saving || deletingTaskId) {
            return;
        }

        setActionError(null);
        setEditingTask(task);
        setShowForm(true);
    }

    async function handleDelete(taskId) {
        if (saving || deletingTaskId) {
            return;
        }

        setActionError(null);

        if (!confirm("Are you sure you want to delete this task?")) {
            return;
        }

        const taskToDelete = tasks.find(
            (task) => task.id === taskId
        );

        if (!taskToDelete) {
            return;
        }

        setDeletingTaskId(taskId);

        setTasks((prev) =>
            prev.filter((task) => task.id !== taskId)
        );

        try {
            await deleteTask(getToken, taskId);
        } catch (err) {
            setTasks((prev) => [
                ...prev,
                taskToDelete,
            ]);

            setActionError(
                err.message ||
                "Failed to delete the task. Please try again."
            );
        } finally {
            setDeletingTaskId(null);
        }
    }

    async function handleSubmit(taskData) {
        if (saving) {
            return;
        }

        setActionError(null);
        setSaving(true);

        if (editingTask) {
            const originalTask = editingTask;

            const updatedTask = {
                ...originalTask,
                ...taskData,
            };

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === originalTask.id
                        ? updatedTask
                        : task
                )
            );

            try {
                const savedTask = await updateTask(
                    getToken,
                    originalTask.id,
                    taskData
                );

                setTasks((prev) =>
                    prev.map((task) =>
                        task.id === originalTask.id
                            ? savedTask
                            : task
                    )
                );

                setShowForm(false);
                setEditingTask(null);
            } catch (err) {
                setTasks((prev) =>
                    prev.map((task) =>
                        task.id === originalTask.id
                            ? originalTask
                            : task
                    )
                );

                setActionError(
                    err.message ||
                    "Failed to update the task. Please try again."
                );
            } finally {
                setSaving(false);
            }

            return;
        }

        try {
            const newTask = await createTask(
                getToken,
                taskData
            );

            setTasks((prev) => [
                ...prev,
                newTask,
            ]);

            setShowForm(false);
        } catch (err) {
            setActionError(
                err.message ||
                "Failed to create the task. Please try again."
            );
        } finally {
            setSaving(false);
        }
    }

    function handleCancel() {
        if (saving) {
            return;
        }

        setShowForm(false);
        setEditingTask(null);
    }

    function handleAddTask() {
        if (saving || deletingTaskId) {
            return;
        }

        setActionError(null);
        setEditingTask(null);
        setShowForm(true);
    }

    const pendingCount =
        getTasksByStatus("pending").length;

    const startedCount =
        getTasksByStatus("started").length;

    const completedCount =
        getTasksByStatus("completed").length;

    return (
        <div className="kanban-wrapper">

            {/* Board Header */}
            <div className="kanban-header">

                <div>
                    <div className="kanban-eyebrow">
                        Workspace Tasks
                    </div>

                    <h2 className="kanban-title">
                        Task Board
                    </h2>

                    <p className="kanban-subtitle">
                        Track your team's work from start to completion.
                    </p>
                </div>

                {canManage && (
                    <button
                        type="button"
                        className="btn btn-primary kanban-add-button"
                        onClick={handleAddTask}
                        disabled={saving || !!deletingTaskId}
                    >
                        <span className="add-icon">
                            +
                        </span>

                        Add Task
                    </button>
                )}

            </div>


            {/* Board Summary */}
            <div className="kanban-summary">

                <div className="kanban-summary-item">
                    <span className="kanban-summary-dot pending"></span>
                    <span>To Do</span>
                    <strong>{pendingCount}</strong>
                </div>

                <div className="kanban-summary-item">
                    <span className="kanban-summary-dot started"></span>
                    <span>In Progress</span>
                    <strong>{startedCount}</strong>
                </div>

                <div className="kanban-summary-item">
                    <span className="kanban-summary-dot completed"></span>
                    <span>Completed</span>
                    <strong>{completedCount}</strong>
                </div>

                <div className="kanban-summary-total">
                    {tasks.length} total
                </div>

            </div>


            {/* Action Error */}
            {actionError && (
                <div className="kanban-action-error">
                    <div>
                        <strong>Something went wrong</strong>
                        <p>{actionError}</p>
                    </div>

                    <button
                        type="button"
                        className="kanban-error-close"
                        onClick={() => setActionError(null)}
                        aria-label="Dismiss error"
                    >
                        ×
                    </button>
                </div>
            )}


            {/* Kanban Columns */}
            <div className="kanban-board">

                {STATUSES.map((status) => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={getTasksByStatus(status)}
                        onEdit={
                            canManage &&
                            !saving &&
                            !deletingTaskId
                                ? handleEdit
                                : null
                        }
                        onDelete={
                            canManage &&
                            !saving &&
                            !deletingTaskId
                                ? handleDelete
                                : null
                        }
                    />
                ))}

            </div>


            {/* Task Form */}
            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    saving={saving}
                />
            )}

        </div>
    );
}

export default KanbanBoard;