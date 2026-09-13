import { Link } from "react-router-dom";
import {
    SignedIn,
    SignedOut,
    useOrganization,
    CreateOrganization,
} from "@clerk/clerk-react";

function SignedInHome() {
    const { organization } = useOrganization();

    return organization ? (
        <div className="home-buttons">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
                Open Dashboard
            </Link>

            <Link to="/pricing" className="btn btn-outline btn-lg">
                View Pricing
            </Link>
        </div>
    ) : (
        <div className="home-create-org">
            <CreateOrganization afterCreateOrganizationUrl="/dashboard" />
        </div>
    );
}

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-badge">
                <span className="home-badge-dot"></span>
                Built for modern teams
            </div>

            <h1 className="home-title">
                Manage your team's work
                <br />
                <span className="home-title-accent">
                    without the chaos.
                </span>
            </h1>

            <p className="home-subtitle">
                A powerful task management workspace for teams to
                organize projects, collaborate, and keep work moving
                forward.
            </p>

            <SignedOut>
                <div className="home-buttons">
                    <Link
                        to="/sign-up"
                        className="btn btn-primary btn-lg"
                    >
                        Get Started for Free
                    </Link>

                    <Link
                        to="/sign-in"
                        className="btn btn-outline btn-lg"
                    >
                        Sign In
                    </Link>
                </div>
            </SignedOut>

            <SignedIn>
                <SignedInHome />
            </SignedIn>

            <div className="home-features">
                <div className="home-feature-card">
                    <div className="home-feature-icon">▦</div>

                    <h3>Organize Tasks</h3>

                    <p>
                        Keep your team's work organized in one
                        centralized workspace.
                    </p>
                </div>

                <div className="home-feature-card">
                    <div className="home-feature-icon">◈</div>

                    <h3>Collaborate</h3>

                    <p>
                        Work together across your organization with
                        secure team-based access.
                    </p>
                </div>

                <div className="home-feature-card">
                    <div className="home-feature-icon">↗</div>

                    <h3>Track Progress</h3>

                    <p>
                        Move tasks from planning to completion and
                        see what your team is working on.
                    </p>
                </div>
            </div>

            <div className="home-trust">
                <span>Simple</span>
                <span>•</span>
                <span>Secure</span>
                <span>•</span>
                <span>Built for Teams</span>
            </div>
        </div>
    );
}

export default HomePage;