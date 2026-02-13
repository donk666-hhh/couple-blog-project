import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/', // 部署到服务器根路径
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // --- 新增的内容从这里开始 ---
  server: {
    port: 5173, // 前端端口
    proxy: {
      '/api': { // 只要请求路径里有 /api，就转发给后端
        target: 'http://47.106.206.188:8080', // 你的后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉 /api 前缀
      }
    }
  }
  // --- 新增的内容到这里结束 ---
})