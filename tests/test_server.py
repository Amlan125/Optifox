import pytest
from Code.server import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_home_status_code(client):
    """Test that the home page returns a status code of 200."""
    response = client.get("/")
    assert response.status_code == 200


def test_home_content(client):
    """Test that the home page contains the expected content."""
    response = client.get("/")
    assert b"Welcome to the Xitaso Patient's Page!" in response.data
    assert (
        b"Created with \xe2\x9d\xa4\xef\xb8\x8f by a very normal human. Promise." in response.data
    )
