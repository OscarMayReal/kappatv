import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FocusRoot } from '@please/lrud';

window.wasMenuFocused = false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FocusRoot orientation="horizontal">
      <App />
    </FocusRoot>
  </StrictMode>,
)
