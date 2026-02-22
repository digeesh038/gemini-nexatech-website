import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'

// ─── Dev-only mock for /sendmail.php ────────────────────────────────────────
// Intercepts the form POST locally, logs the data to the terminal,
// and returns "success" so you can test the full flow without PHP.
// This plugin does NOTHING in production builds.
function phpMailMock(): Plugin {
  return {
    name: 'php-mail-mock',
    configureServer(server) {
      server.middlewares.use('/sendmail.php', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('error')
          return
        }

        // Collect POST body chunks
        const chunks: Buffer[] = []
        req.on('data', (chunk: Buffer) => chunks.push(chunk))
        req.on('end', () => {
          const rawBody = Buffer.concat(chunks).toString()
          console.log('\n\x1b[36m[sendmail.php mock]\x1b[0m Form submission received:')
          // Parse multipart/form-data field names for display
          rawBody.split('&').forEach(pair => {
            const [k, v] = pair.split('=')
            if (k) console.log(`  \x1b[33m${decodeURIComponent(k)}\x1b[0m: ${decodeURIComponent((v ?? '').replace(/\+/g, ' '))}`)
          })
          console.log('\x1b[32m  → Returning "success" (dev mock)\x1b[0m\n')
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('success')
        })
      })
    },
  }
}
// ────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    phpMailMock(),
  ],
})

