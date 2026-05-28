import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './lib/i18n.ts'
import { ThemeProvider } from "@/app/providers/theme-provider.tsx"

createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<ThemeProvider>
				<App/>
			</ThemeProvider>
		</StrictMode>,
)
