import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">

                {/* Brand */}
                <div className="footer-brand-section">
                    <Link to="/" className="footer-brand">
                        <span className="footer-brand-mark" aria-hidden="true">
                            <span className="footer-brand-check">✓</span>

                            <span className="footer-brand-lines">
                                <span></span>
                                <span></span>
                            </span>
                        </span>

                        <span>
                            TaskForge
                        </span>
                    </Link>

                    <p className="footer-description">
                        A modern task management platform
                        for teams.
                    </p>

                    <div className="footer-socials">

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/cgarg3/"
                            className="footer-social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                        >
                            in
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/Cgarg547"
                            className="footer-social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            title="GitHub"
                        >
                            GH
                        </a>

                    </div>
                </div>


                {/* Product */}
                <div className="footer-column">

                    <h3>
                        Product
                    </h3>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/pricing">
                        Pricing
                    </Link>

                    <Link to="/">
                        Features
                    </Link>

                </div>


                {/* Developer */}
                <div className="footer-column">

                    <h3>
                        Developer
                    </h3>

                    <span>
                        Built by
                    </span>

                    <strong>
                        Chirag Garg
                    </strong>

                    <span>
                        Full-Stack Developer
                    </span>

                </div>

            </div>


            {/* Footer Bottom */}
            <div className="footer-bottom">

                <span>
                    © {new Date().getFullYear()} TaskForge.
                    All rights reserved.
                </span>

                <span>
                    Built with ❤️ by Chirag Garg
                </span>

            </div>
        </footer>
    );
}

export default Footer;