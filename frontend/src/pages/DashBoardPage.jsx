import { useState, useEffect, useCallback } from "react";
import {
    useAuth,
    useOrganization,
    CreateOrganization,
} from "@clerk/clerk-react";
import { getTasks } from "../services/api";
import KanbanBoard from "../components/KanbanBoard.jsx";

function DashboardPage() {
    const { getToken } = useAuth();

    const { organization, memberships } = useOrganization({
        memberships: { infinite: true },
    });

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const memberCount = memberships?.count ?? 0;
    const orgId = organization?.id;

    const loadTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getTasks(getToken);
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        if (orgId) {
            loadTasks();
        } else {
            setLoading(false);
        }
    }, [orgId, loadTasks]);

    if (!organization) {
        return (
            <div className="dashboard-container">
                <div className="no-org-container">
                    <div className="no-org-icon">T</div>

                    <h1 className="no-org-title">
                        Welcome to TaskForge
                    </h1>

                    <p className="no-org-text">
                        Create or join an organization to start managing
                        tasks with your team.
                    </p>

                    <CreateOrganization
                        afterCreateOrganizationUrl="/dashboard"
                    />
                </div>
            </div>
        );
    }

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const startedTasks = tasks.filter(
        (task) => task.status === "started"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <div>
                    <div className="dashboard-eyebrow">
                        Workspace
                    </div>

                    <h1 className="dashboard-title">
                        {organization.name}
                    </h1>

                    <p className="dashboard-subtitle">
                        Manage your team's tasks and keep projects moving.
                    </p>
                </div>

                <div className="dashboard-org-meta">
                    <div className="member-avatar-stack">
                        <div className="member-avatar">
                            {memberCount}
                        </div>
                    </div>

                    <div>
                        <span className="member-count">
                            {memberCount} member
                            {memberCount !== 1 ? "s" : ""}
                        </span>

                        <span className="member-label">
                            Organization
                        </span>
                    </div>
                </div>
            </div>

            {!loading && !error && (
                <div className="dashboard-stats">

                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">
                                Total Tasks
                            </span>

                            <span className="stat-icon">
                                ▦
                            </span>
                        </div>

                        <div className="stat-value">
                            {totalTasks}
                        </div>

                        <div className="stat-description">
                            Tasks in your workspace
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">
                                To Do
                            </span>

                            <span className="stat-icon">
                                ○
                            </span>
                        </div>

                        <div className="stat-value">
                            {pendingTasks}
                        </div>

                        <div className="stat-description">
                            Tasks waiting to start
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">
                                In Progress
                            </span>

                            <span className="stat-icon">
                                ◐
                            </span>
                        </div>

                        <div className="stat-value">
                            {startedTasks}
                        </div>

                        <div className="stat-description">
                            Currently being worked on
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">
                                Completed
                            </span>

                            <span className="stat-icon">
                                ✓
                            </span>
                        </div>

                        <div className="stat-value">
                            {completedTasks}
                        </div>

                        <div className="stat-description">
                            Successfully completed
                        </div>
                    </div>

                </div>
            )}

            <div className="task-board-header">
                <div>
                    <h2 className="task-board-title">
                        Task Board
                    </h2>

                    <p className="task-board-subtitle">
                        Organize and track your team's work.
                    </p>
                </div>

                <div className="task-board-status">
                    <span className="status-dot"></span>
                    Live workspace
                </div>
            </div>

            {loading && (
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>

                    <p>
                        Loading your workspace...
                    </p>
                </div>
            )}

            {!loading && error && (
                <div className="card-error">
                    <p className="text-error text-error-title">
                        Error loading tasks
                    </p>

                    <p className="text-error text-error-message">
                        {error}
                    </p>

                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={loadTasks}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="dashboard-board-wrapper">
                    <KanbanBoard
                        tasks={tasks}
                        setTasks={setTasks}
                        getToken={getToken}
                    />
                </div>
            )}

        </div>
    );
}

export default DashboardPage;