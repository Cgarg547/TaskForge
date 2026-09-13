import os

from dotenv import load_dotenv

load_dotenv()


def get_required_env(name: str) -> str:
    value = os.getenv(name)

    if not value:
        raise RuntimeError(f"Required environment variable is missing: {name}")

    return value


class Config:
    CLERK_SECRET_KEY: str = get_required_env("CLERK_SECRET_KEY")
    CLERK_PUBLISHABLE_KEY: str = get_required_env("CLERK_PUBLISHABLE_KEY")
    CLERK_WEBHOOK_SECRET: str = get_required_env("CLERK_WEBHOOK_SECRET")
    CLERK_JWKS_URL: str = get_required_env("CLERK_JWKS_URL")

    DATABASE_URL: str = get_required_env("DATABASE_URL")
    FRONTEND_URL: str = get_required_env("FRONTEND_URL")

    FREE_TIER_LIMIT: int = 2
    PRO_TIER_MEMBERSHIP_LIMIT: int = 0  # unlimited


settings = Config()