'use client';

import { useEffect } from 'react';

export default function Security() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Prevent Right-Click Context Menu (Disables "Save Image As...")
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      console.log('[Security Alert]: Sağ tık menüsü kapatılmıştır.');
    };

    // 2. Prevent Text Selection / Copying
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      console.log('[Security Alert]: Kopyalama işlemi engellenmiştir.');
    };

    // 3. Prevent Image Dragging (Disables dragging to desktop to save)
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // 4. Block Keyboard Inspection and Saving Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12
      if (e.key === 'F12') {
        e.preventDefault();
        console.log('[Security Alert]: Geliştirici konsolu kısayolu engellendi.');
      }

      // Block Ctrl+U (View Source)
      if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        console.log('[Security Alert]: Sayfa kaynağını görüntüleme engellendi.');
      }

      // Block Ctrl+S (Save Page)
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log('[Security Alert]: Sayfa kaydetme engellendi.');
      }

      // Block Ctrl+C / Ctrl+X (Copy / Cut)
      if (e.ctrlKey && (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'x')) {
        e.preventDefault();
        console.log('[Security Alert]: Kopyalama kısayolu engellendi.');
      }

      // Block Ctrl+Shift+I / Ctrl+Shift+C / Ctrl+Shift+J (DevTools Panel)
      if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'j')) {
        e.preventDefault();
        console.log('[Security Alert]: Geliştirici paneli kısayolu engellendi.');
      }
    };

    // Attach Event Listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up listeners on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Silent global utility
}
