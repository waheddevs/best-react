"use client";

import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useId, useState } from "react";

type FilterOption = { label: string; value: string };

type TeacherResultFilterDropdownProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly FilterOption[];
  value: string;
};

export function TeacherResultFilterDropdown({
  label,
  onChange,
  options,
  value,
}: TeacherResultFilterDropdownProps) {
  const id = useId();
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorElement);
  const labelId = `${id}-label`;
  const valueId = `${id}-value`;
  const menuId = `${id}-menu`;
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? options[0]?.label;

  return (
    <div className="teacherResults__filterField">
      <span id={labelId}>{label}</span>
      <button
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-labelledby={`${labelId} ${valueId}`}
        className="teacherResults__dropdownTrigger"
        onClick={(event) => setAnchorElement(event.currentTarget)}
        type="button"
      >
        <span id={valueId}>{selectedLabel}</span>
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
            className: "teacherResults__dropdownMenu",
            style: { width: anchorElement?.offsetWidth },
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {options.map((option) => (
          <MenuItem
            className="teacherResults__dropdownOption"
            data-active={option.value === value}
            key={option.value}
            onClick={() => {
              if (option.value === value) {
                setAnchorElement(null);
                return;
              }
              setAnchorElement(null);
              onChange(option.value);
            }}
            selected={option.value === value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
