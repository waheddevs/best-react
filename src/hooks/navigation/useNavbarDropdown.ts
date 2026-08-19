import { useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";

export function useNavbarDropdown() {
  /* HOOKS */
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const suppressNextFocusOpen = useRef(false);

  /* HANDLERS */
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.blur();
    setIsOpen(false);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;

    event.preventDefault();
    setIsOpen(false);

    if (triggerRef.current && document.activeElement !== triggerRef.current) {
      suppressNextFocusOpen.current = true;
      triggerRef.current.focus();
    }
  };

  const handleFocus = () => {
    if (suppressNextFocusOpen.current) {
      suppressNextFocusOpen.current = false;
      return;
    }

    setIsOpen(true);
  };

  return {
    isOpen,
    triggerRef,
    handleMouseEnter,
    handleMouseLeave,
    handleNavigation,
    handleBlur,
    handleKeyDown,
    handleFocus,
  };
}
