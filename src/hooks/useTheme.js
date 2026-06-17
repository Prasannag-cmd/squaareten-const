/* ============================================================
   useTheme — Light Theme Locking Management
   ============================================================ */
import { useEffect, useCallback } from 'react';

export function useTheme() {
  // Always apply light theme to HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('sq10-theme', 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    // No-op since dark theme is removed
  }, []);

  return { theme: 'light', toggleTheme };
}

export default useTheme;
