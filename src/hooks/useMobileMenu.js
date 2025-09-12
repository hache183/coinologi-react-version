import { useState, useEffect } from 'react';

export default function useMobileMenu(navRef) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = (e) => {
    console.log('useMobileMenu.toggleMobileMenu called', { current: isMenuOpen, eventTarget: e?.target });
    setIsMenuOpen((open) => !open);
  };

  useEffect(() => {
    console.log('useMobileMenu isMenuOpen changed', isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    // Chiudi menu solo se la larghezza supera la soglia mobile
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
