import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FocusRoot } from '@please/lrud';
import { FilesPlayer } from './Filesplayer.tsx';

window.wasMenuFocused = false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FocusRoot orientation="horizontal">
      {window.location.pathname === "/" ? <App /> : window.location.pathname === "/filesplayer" ? <FilesPlayer /> : <App />}
    </FocusRoot>
  </StrictMode>,
)
