# Smart Finance

*Simpler, More Comprehensive Bookkeeping.*

AI 智慧個人財務管理系統：整合網站、LINE Bot、自動記帳、AI 消費分析、帳戶管理及預算規劃。
以個人自用、可長期使用並部署上線為目標。

> **目前狀態：第一階段（基礎建置）進行中，尚無可執行的程式。**
> 本文件只記錄已完成或已確認的內容，尚未實作的功能不在此列出操作步驟。

## 文件

| 文件 | 說明 |
|---|---|
| [docs/smart-finance-requirements-v1.md](docs/smart-finance-requirements-v1.md) | 系統總需求（最終產品的功能、技術方向及開發原則） |
| [docs/smart-finance-requirements-v1.1.md](docs/smart-finance-requirements-v1.1.md) | 開發決策與修訂計畫（已確認決策 D1～D19、任務清單）。與總需求衝突時以此為準 |

## 目錄規劃

```
SmartFinance/
├─ backend/        FastAPI 後端（任務 1-3 建立）
├─ frontend/       React + Vite + TypeScript + Tailwind 前端（任務 1-4 建立）
├─ docs/           需求與設計文件
├─ .gitignore
├─ .gitattributes
└─ README.md
```

`backend/` 與 `frontend/` 目前尚未建立，會在對應任務中建立。

## 開發環境（Windows，決策 D19）

| 工具 | 版本 | 備註 |
|---|---|---|
| Git | 2.55 | |
| Python | 3.14 | 使用 conda 的 Smart Finance 專用環境，不使用 base；環境於任務 1-3 建立 |
| Node.js | 24.20.0 | |
| npm | 11.19.0 | |
| VS Code | 1.141 | |

## 機密與環境變數

- **任何金鑰、密碼、Token、資料庫連線字串都不得提交到 Git。**
- 所有 `.env`、`.env.*` 檔案已被 `.gitignore` 忽略；只有 `.env.example` 可以提交，且不得填入真實值。
- 後端與前端的 `.env.example` 會在任務 1-3、1-4 隨程式一起建立，只列出當下實際用到的變數。
- 前端（Vite）的 `VITE_` 開頭變數會被打包進瀏覽器程式碼，**不得放入任何機密**。

## 開發進度

| 任務 | 內容 | 狀態 |
|---|---|---|
| 1-1 | Windows 開發環境確認 | ✅ 已驗收 |
| 1-2 | 專案目錄結構、.gitignore、README、GitHub Repo | ✅ 已驗收 |
| 1-3 ～ 1-10 | 見 [開發決策與修訂計畫](docs/smart-finance-requirements-v1.1.md) | 未開始 |
