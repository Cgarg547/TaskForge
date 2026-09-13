import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
    return (
        <div className="auth-container">

            <div className="auth-brand">
                <div className="auth-brand-mark">
                    T
                </div>

                <div>
                    <div className="auth-brand-name">
                        TaskForge
                    </div>

                    <div className="auth-brand-subtitle">
                        Team workspace
                    </div>
                </div>
            </div>


            <div className="auth-heading">
                <h1>
                    Create your account
                </h1>

                <p>
                    Get started with your team's workspace.
                </p>
            </div>


            <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                appearance={{
                    variables: {
                        colorPrimary: "#10b981",
                        colorBackground: "#111827",
                        colorText: "#f8fafc",
                        colorTextSecondary: "#94a3b8",
                        colorInputBackground: "#0f172a",
                        colorInputText: "#f8fafc",
                        colorNeutral: "#334155",
                        borderRadius: "10px",
                    },

                    elements: {
                        rootBox: {
                            width: "100%",
                        },

                        card: {
                            width: "100%",
                            maxWidth: "420px",
                            background: "#111827",
                            border: "1px solid #334155",
                            boxShadow:
                                "0 24px 60px rgba(0, 0, 0, 0.35)",
                        },

                        headerTitle: {
                            display: "none",
                        },

                        headerSubtitle: {
                            display: "none",
                        },

                        socialButtonsBlockButton: {
                            background: "#1e293b",
                            border: "1px solid #334155",
                            color: "#f8fafc",
                        },

                        formFieldInput: {
                            background: "#0f172a",
                            border: "1px solid #334155",
                            color: "#f8fafc",
                        },

                        formButtonPrimary: {
                            background: "#10b981",
                            color: "#ffffff",
                        },

                        footerActionLink: {
                            color: "#34d399",
                        },
                    },
                }}
            />

        </div>
    );
}

export default SignUpPage;