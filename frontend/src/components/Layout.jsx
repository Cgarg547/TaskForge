import { Link, Outlet, useLocation } from "react-router-dom";
import {
    SignedIn,
    SignedOut,
    UserButton,
    OrganizationSwitcher,
    useOrganization,
} from "@clerk/clerk-react";
import Footer from "./Footer.jsx";

function SignedInNavigation() {
    const { organization } = useOrganization();
    const location = useLocation();

    return (
        <>
            <div className="sidebar-section">
                <p className="sidebar-label">
                    Workspace
                </p>

                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/dashboard"
                    afterSelectOrganizationUrl="/dashboard"
                    createOrganizationMode="modal"
                    appearance={{
                        elements: {
                            organizationSwitcherTrigger:
                                "org-switcher",

                            organizationPreviewMainIdentifier:
                                "org-name",

                            organizationPreviewMainIdentifier__organizationSwitcherTrigger:
                                "org-name",
                        },
                    }}
                />
            </div>

            {organization && (
                <nav className="sidebar-nav">

                    <Link
                        to="/"
                        className={`sidebar-link ${
                            location.pathname === "/"
                                ? "active"
                                : ""
                        }`}
                    >
                        <span className="sidebar-icon">
                            ⌂
                        </span>

                        Home
                    </Link>


                    <Link
                        to="/dashboard"
                        className={`sidebar-link ${
                            location.pathname === "/dashboard"
                                ? "active"
                                : ""
                        }`}
                    >
                        <span className="sidebar-icon">
                            ▦
                        </span>

                        Dashboard
                    </Link>

                <Link
                    to="/pricing"
                    className={`sidebar-link ${
                        location.pathname === "/pricing"
                            ? "active"
                            : ""
                    }`}
                >
                    <span className="sidebar-icon">
                        ◆
                    </span>

                    Pricing
                </Link>

                </nav>
            )}
        </>
    );
}


function Layout() {
    return (
        <div className="app-shell">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="sidebar-header">

                    <Link
                        to="/"
                        className="brand"
                    >
                        <span className="brand-mark" aria-hidden="true">
                            <span className="brand-check">✓</span>
                            <span className="brand-lines">
                                <span></span>
                                <span></span>
                            </span>
                        </span>

                        <span>
                            TaskForge
                        </span>
                    </Link>

                </div>


                <div className="sidebar-content">

                    <SignedIn>
                        <SignedInNavigation />
                    </SignedIn>


                    <SignedOut>
                        <nav className="sidebar-nav">

                            <Link
                                to="/"
                                className="sidebar-link"
                            >
                                <span className="sidebar-icon">
                                    ⌂
                                </span>

                                Home
                            </Link>


                            <Link
                                to="/pricing"
                                className="sidebar-link"
                            >
                                <span className="sidebar-icon">
                                    ◆
                                </span>

                                Pricing
                            </Link>

                        </nav>
                    </SignedOut>

                </div>


                {/* Sidebar Footer */}
                <div className="sidebar-footer">

                    <SignedIn>

                        <div className="user-area">

                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox:
                                            "user-avatar",
                                    },
                                }}
                            />

                            <span className="user-label">
                                Account
                            </span>

                        </div>

                    </SignedIn>


                    <SignedOut>

                        <div className="auth-actions">

                            <Link
                                to="/sign-in"
                                className="sidebar-link"
                            >
                                Sign In
                            </Link>


                            <Link
                                to="/sign-up"
                                className="sidebar-signup"
                            >
                                Get Started
                            </Link>

                        </div>

                    </SignedOut>

                </div>

            </aside>


            {/* Main Area */}
            <div className="main-area">

                <header className="topbar">

                    <div className="topbar-content">

                        <div>
                            <span className="topbar-subtitle">
                                Business workspace
                            </span>
                        </div>


                        <div className="topbar-actions">
                        </div>

                    </div>

                </header>


                <main className="page-content">
                    <Outlet />
                </main>
                <Footer/>
            </div>

        </div>
    );
}


export default Layout;