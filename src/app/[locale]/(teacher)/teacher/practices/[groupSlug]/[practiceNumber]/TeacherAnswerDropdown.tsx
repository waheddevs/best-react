"use client";

import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useId, useState } from "react";

type TeacherAnswerDropdownProps = {
  ariaLabel: string;
  onChange: (value: string) => void;
  options: readonly string[];
  value: string;
};

export function TeacherAnswerDropdown({
  ariaLabel,
  onChange,
  options,
  value,
}: TeacherAnswerDropdownProps) {
  const id = useId();
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorElement);
  const menuId = `${id}-menu`;

  return (
    <>
      <button
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={ariaLabel}
        className="teacherAnswerDropdown__trigger"
        onClick={(event) => setAnchorElement(event.currentTarget)}
        type="button"
      >
        <span>{value}</span>
        <KeyboardArrowDownRounded aria-hidden="true" />
      </button>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        id={menuId}
        onClose={() => setAnchorElement(null)}
        open={isOpen}
        slotProps={{
          paper: {
            className: "teacherAnswerDropdown__menu",
            style: { width: anchorElement?.offsetWidth },
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {options.map((option) => (
          <MenuItem
            className="teacherAnswerDropdown__menuItem"
            data-active={option === value}
            key={option}
            onClick={() => {
              onChange(option);
              setAnchorElement(null);
            }}
            selected={option === value}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
