import pytest
from pydantic import ValidationError

from app.core.config import Settings


def test_defaults_without_env():
    settings = Settings(_env_file=None)
    assert settings.app_env == "development"
    assert settings.cors_origins == ["http://localhost:5173"]
    assert settings.is_development is True


def test_reads_environment_variables(monkeypatch):
    monkeypatch.setenv("APP_ENV", "production")
    monkeypatch.setenv("CORS_ORIGINS", "http://a.test, http://b.test")
    settings = Settings(_env_file=None)
    assert settings.app_env == "production"
    assert settings.cors_origins == ["http://a.test", "http://b.test"]
    assert settings.is_development is False


def test_reads_env_file(tmp_path):
    env_file = tmp_path / ".env"
    env_file.write_text("APP_ENV=production\nCORS_ORIGINS=http://file.test\n", encoding="utf-8")
    settings = Settings(_env_file=env_file)
    assert settings.app_env == "production"
    assert settings.cors_origins == ["http://file.test"]


def test_environment_variable_overrides_env_file(tmp_path, monkeypatch):
    env_file = tmp_path / ".env"
    env_file.write_text("APP_ENV=production\n", encoding="utf-8")
    monkeypatch.setenv("APP_ENV", "development")
    assert Settings(_env_file=env_file).app_env == "development"


def test_invalid_app_env_rejected(monkeypatch):
    monkeypatch.setenv("APP_ENV", "staging")
    with pytest.raises(ValidationError):
        Settings(_env_file=None)


def test_wildcard_cors_rejected(monkeypatch):
    monkeypatch.setenv("CORS_ORIGINS", "*")
    with pytest.raises(ValidationError):
        Settings(_env_file=None)
