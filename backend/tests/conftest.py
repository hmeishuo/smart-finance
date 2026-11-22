from collections.abc import Callable

import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


@pytest.fixture(autouse=True)
def _isolate_env(monkeypatch: pytest.MonkeyPatch) -> None:
    """避免開發機上的環境變數影響測試結果。"""
    monkeypatch.delenv("APP_ENV", raising=False)
    monkeypatch.delenv("CORS_ORIGINS", raising=False)


@pytest.fixture
def make_client() -> Callable[..., TestClient]:
    """依指定設定建立測試用 client；不讀取 backend/.env。"""

    def _make(**overrides: object) -> TestClient:
        settings = Settings(_env_file=None, **overrides)
        return TestClient(create_app(settings))

    return _make


@pytest.fixture
def client(make_client: Callable[..., TestClient]) -> TestClient:
    return make_client()
