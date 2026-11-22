import pytest


def test_health_returns_ok(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_docs_available_in_development(make_client):
    client = make_client(app_env="development")
    assert client.get("/docs").status_code == 200
    assert client.get("/openapi.json").status_code == 200


@pytest.mark.parametrize("path", ["/docs", "/redoc", "/openapi.json"])
def test_docs_hidden_in_production(make_client, path):
    client = make_client(app_env="production")
    assert client.get(path).status_code == 404


def test_health_still_works_in_production(make_client):
    client = make_client(app_env="production")
    assert client.get("/health").status_code == 200
