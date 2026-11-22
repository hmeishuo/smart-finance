"""健康檢查端點。

只回傳服務狀態，不暴露版本、環境名稱等資訊。資料庫檢查（/health/db）於任務 1-6 加入。
"""

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
