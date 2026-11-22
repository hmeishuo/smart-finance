ALLOWED = "http://localhost:5173"
DISALLOWED = "http://evil.example"


def _preflight(client, origin):
    return client.options(
        "/health",
        headers={
            "Origin": origin,
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "Authorization",
        },
    )


def test_preflight_allowed_origin(client):
    response = _preflight(client, ALLOWED)
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == ALLOWED
    assert "access-control-allow-credentials" not in response.headers


def test_preflight_disallowed_origin(client):
    response = _preflight(client, DISALLOWED)
    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers


def test_simple_request_allowed_origin(client):
    response = client.get("/health", headers={"Origin": ALLOWED})
    assert response.headers.get("access-control-allow-origin") == ALLOWED


def test_simple_request_disallowed_origin(client):
    response = client.get("/health", headers={"Origin": DISALLOWED})
    assert "access-control-allow-origin" not in response.headers


def test_custom_origins_from_settings(make_client):
    client = make_client(cors_origins="https://app.example.test")
    response = _preflight(client, "https://app.example.test")
    assert response.headers.get("access-control-allow-origin") == "https://app.example.test"
    assert "access-control-allow-origin" not in _preflight(client, ALLOWED).headers
