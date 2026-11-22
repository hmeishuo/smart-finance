// 前端設定。只能放公開資訊：VITE_ 變數會被打包進瀏覽器程式碼。
const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
).replace(/\/+$/, '')
