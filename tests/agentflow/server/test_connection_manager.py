"""Tests for WebSocket connection lifecycle management."""

import asyncio
from unittest.mock import AsyncMock, MagicMock

from agentflow.server.connection_manager import ConnectionManager


def test_connect_accepts_and_tracks_connection():
    manager = ConnectionManager()
    websocket = MagicMock()
    websocket.accept = AsyncMock()

    asyncio.run(manager.connect(websocket))

    websocket.accept.assert_awaited_once()
    assert manager.active_connections == [websocket]


def test_broadcast_removes_broken_connections_and_continues():
    manager = ConnectionManager()
    broken = MagicMock()
    broken.client = "broken-client"
    broken.send_text = AsyncMock(side_effect=RuntimeError("connection closed"))
    healthy = MagicMock()
    healthy.send_text = AsyncMock()
    manager.active_connections = [broken, healthy]

    asyncio.run(manager.broadcast("message"))

    broken.send_text.assert_awaited_once_with("message")
    healthy.send_text.assert_awaited_once_with("message")
    assert manager.active_connections == [healthy]
