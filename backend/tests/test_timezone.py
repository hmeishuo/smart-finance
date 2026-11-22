"""時區測試（決策 D18）：確認 Windows 上可以載入 Asia/Taipei，並驗證跨日、跨月、跨年邊界。"""

from datetime import datetime, timedelta, timezone
from importlib.metadata import version
from zoneinfo import ZoneInfo

import pytest

TAIPEI = ZoneInfo("Asia/Taipei")


def test_tzdata_installed():
    assert version("tzdata")


def test_zoneinfo_loads_asia_taipei():
    assert TAIPEI.key == "Asia/Taipei"


def test_taipei_offset_is_plus_8():
    moment = datetime(2026, 11, 22, 12, 0, tzinfo=TAIPEI)
    assert moment.utcoffset() == timedelta(hours=8)


@pytest.mark.parametrize(
    ("utc_moment", "expected_taipei"),
    [
        # 跨日與跨月：UTC 16:00 為台北隔天 00:00
        (datetime(2026, 11, 30, 16, 0, tzinfo=timezone.utc), datetime(2026, 12, 1, 0, 0)),
        (datetime(2026, 11, 30, 15, 59, tzinfo=timezone.utc), datetime(2026, 11, 30, 23, 59)),
        # 跨年
        (datetime(2026, 12, 31, 16, 0, tzinfo=timezone.utc), datetime(2027, 1, 1, 0, 0)),
        # UTC 與台北不同日期的時段（台北 00:00～07:59）
        (datetime(2026, 11, 21, 23, 30, tzinfo=timezone.utc), datetime(2026, 11, 22, 7, 30)),
    ],
)
def test_utc_to_taipei_boundaries(utc_moment, expected_taipei):
    local = utc_moment.astimezone(TAIPEI)
    assert local.replace(tzinfo=None) == expected_taipei
