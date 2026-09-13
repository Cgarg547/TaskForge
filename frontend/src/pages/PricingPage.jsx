import {
    useOrganization,
    PricingTable,
    CreateOrganization,
} from "@clerk/clerk-react";

function PricingPage() {
    const { organization, membership } = useOrganization();

    const isAdmin = membership?.role === "org:admin";

    if (!organization) {
        return (
            <div className="pricing-container">
                <div className="no-org-container">
                    <div className="no-org-icon">◆</div>

                    <h1 className="no-org-title">
                        Choose your plan
                    </h1>

                    <p className="no-org-text">
                        Create or join an organization to view
                        available TaskForge plans.
                    </p>

                    <CreateOrganization
                        afterCreateOrganizationUrl="/pricing"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="pricing-container">

            <div className="pricing-header">

                <div className="pricing-badge">
                    <span className="pricing-badge-dot"></span>
                    Simple & transparent
                </div>

                <h1 className="pricing-title">
                    Plans that scale
                    <span className="pricing-title-accent">
                        {" "}with your team.
                    </span>
                </h1>

                <p className="pricing-subtitle">
                    Start free with up to 2 members.
                    Upgrade to Pro when your team grows.
                </p>

            </div>


            {!isAdmin ? (
                <div className="pricing-admin-message">

                    <div className="pricing-admin-icon">
                        🔒
                    </div>

                    <h2>
                        Organization admin required
                    </h2>

                    <p>
                        Only your organization administrator can
                        manage the subscription and change plans.
                    </p>

                </div>
            ) : (
                <div className="pricing-table-wrapper">

                    <PricingTable
                        for="organization"
                        highlightedPlan="pro"
                        ctaPosition="bottom"
                        appearance={{
                            variables: {
                                colorPrimary: "#10b981",
                                colorBackground: "#111827",
                                colorInputBackground: "#1e293b",
                                colorInputText: "#f8fafc",
                                colorText: "#f8fafc",
                                colorTextSecondary: "#94a3b8",
                                colorNeutral: "#334155",
                                borderRadius: "12px",
                            },
                        }}
                        checkoutProps={{
                            appearance: {
                                variables: {
                                    colorPrimary: "#10b981",
                                },
                            },
                        }}
                    />

                </div>
            )}

        </div>
    );
}

export default PricingPage;