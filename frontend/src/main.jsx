import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // ✅ add this line

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>   {/* ✅ wrap App with context */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
