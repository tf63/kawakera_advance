import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // この三行を追加
        host: true //
    }, //
    define: {
        DEBUG: 1
    }
})
