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
├─ backend/        FastAPI 後端
├─ frontend/       React + Vite + TypeScript + Tailwind 前端
├─ docs/           需求與設計文件
├─ .gitignore
├─ .gitattributes
└─ README.md
```

## 開發環境（Windows，決策 D19）

| 工具 | 版本 | 備註 |
|---|---|---|
| Git | 2.55 | |
| Python | 3.14 | 使用 conda 的 `smart-finance` 專用環境（conda-forge），不使用 base |
| Node.js | 24.20.0 | |
| npm | 11.19.0 | |
| VS Code | 1.141 | |

> **Windows 注意**：若「智慧型應用程式控制（Smart App Control）」為開啟狀態，會封鎖未簽章的套件 DLL（例如 `pydantic_core`），導致後端無法啟動，錯誤訊息為「應用程式控制原則已封鎖此檔案」。是否關閉屬於使用者自行決定的安全性設定。

## 後端（backend）

以下步驟皆已在 Windows 實際驗證。

### 1. 建立 conda 環境（只需一次）

```powershell
conda create -n smart-finance --override-channels -c conda-forge python=3.14
conda activate smart-finance
```

### 2. 安裝依賴

```powershell
cd backend
python -m pip install -r requirements-dev.txt
```

- `requirements.txt`：執行期依賴。
- `requirements-dev.txt`：再加上測試工具（pytest、httpx）。

### 3. 設定環境變數

```powershell
copy .env.example .env
```

`backend/.env` 不得提交。目前的變數：

| 變數 | 說明 | 預設 |
|---|---|---|
| `APP_ENV` | `development` 或 `production`；production 會關閉 `/docs` | `development` |
| `CORS_ORIGINS` | 允許的前端網址，逗號分隔，不可使用 `*` | `http://localhost:5173` |

### 4. 執行測試

```powershell
python -m pytest
```

### 5. 啟動開發伺服器

```powershell
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

- 健康檢查：<http://127.0.0.1:8000/health> 回傳 `{"status":"ok"}`
- API 文件（僅 development）：<http://127.0.0.1:8000/docs>

## 前端（frontend）

以下步驟皆已在 Windows 實際驗證。技術：React 19、Vite 8、TypeScript、Tailwind CSS 4、React Router 8。

### 1. 安裝依賴

```powershell
cd frontend
npm install
```

依賴版本由 `package-lock.json` 鎖定，請一併提交。

### 2. 設定環境變數（選用）

```powershell
copy .env.example .env.local
```

| 變數 | 說明 | 預設 |
|---|---|---|
| `VITE_API_BASE_URL` | 後端 API 位址（不含結尾斜線） | `http://127.0.0.1:8000` |

`VITE_` 開頭的變數會被打包進瀏覽器程式碼，**不得放入任何機密**。

### 3. 啟動開發伺服器

```powershell
npm run dev
```

- 開啟 <http://localhost:5173>（請使用 `localhost`，後端 CORS 預設只允許這個網址）。
- 「系統設定」頁的「後端連線狀態」會呼叫後端 `/health`；後端未啟動時顯示「無法連線」。

### 4. 檢查與建置

```powershell
npm run lint
npm run build
```

建置結果輸出到 `frontend/dist/`（不提交）。

## 機密與環境變數

- **任何金鑰、密碼、Token、資料庫連線字串都不得提交到 Git。**
- 所有 `.env`、`.env.*` 檔案已被 `.gitignore` 忽略；只有 `.env.example` 可以提交，且不得填入真實值。
- `backend/.env.example`、`frontend/.env.example` 只列出當下實際用到的變數。
- 前端（Vite）的 `VITE_` 開頭變數會被打包進瀏覽器程式碼，**不得放入任何機密**。

## 開發進度

| 任務 | 內容 | 狀態 |
|---|---|---|
| 1-1 | Windows 開發環境確認 | ✅ 已驗收 |
| 1-2 | 專案目錄結構、.gitignore、README、GitHub Repo | ✅ 已驗收 |
| 1-3 | FastAPI 骨架：設定、CORS、/health、pytest | ✅ 已驗收 |
| 1-4 | React + Vite + TS + Tailwind 骨架：側邊欄、頁面空殼、RWD | 進行中 |
| 1-5 ～ 1-10 | 見 [開發決策與修訂計畫](docs/smart-finance-requirements-v1.1.md) | 未開始 |
