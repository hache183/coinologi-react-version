import { useState, useEffect } from 'react';

export default function useMobileMenu(navRef) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMenuOpen((open) => !open);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [window.location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMenuOpen) return;
      // Evita di chiudere se il click è sul bottone toggle
      if (navRef.current && navRef.current.contains(event.target)) {
        const isToggleBtn = event.target.closest('button');
        if (isToggleBtn) return;
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, navRef]);

  return { isMenuOpen, toggleMobileMenu, setIsMenuOpen };
}
