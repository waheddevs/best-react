"use client";

import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import AlternateEmailRounded from "@mui/icons-material/AlternateEmailRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import PersonAddAlt1Rounded from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import UnfoldMoreRounded from "@mui/icons-material/UnfoldMoreRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, type MouseEvent } from "react";

import { useAdminProvisionUser } from "@/hooks/admin/useAdminProvisionUser";
import type {
  AdminProvisionGroupCategory,
  AdminProvisionGroupOption,
  AdminProvisionUserCopy,
  ProvisionableUserRole,
} from "@/types/admin/AdminProvisionUser";

type AdminProvisionUserFormProps = {
  copy: AdminProvisionUserCopy;
  groups: AdminProvisionGroupOption[];
  role: ProvisionableUserRole;
};

type ProvisionMenuOption = { label: string; value: string };

type ProvisionMenuProps = {
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  options: ProvisionMenuOption[];
  placeholder: string;
  value: string;
};

const groupCategories: AdminProvisionGroupCategory[] = ["IELTS", "CEFR", "GENERAL_ENGLISH"];

function ProvisionMenu({
  disabled = false,
  label,
  onChange,
  options,
  placeholder,
  value,
}: ProvisionMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorElement);
  const selectedLabel = options.find((option) => option.value === value)?.label ?? placeholder;
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) setAnchorElement(event.currentTarget);
  };
  const handleClose = () => setAnchorElement(null);

  return (
    <div className="adminWorkspace__provisionFilterField">
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="adminStudentFilters__card adminWorkspace__provisionFilter"
        disabled={disabled}
        onClick={handleOpen}
        type="button"
      >
        <span>{label}</span>
        <strong>{selectedLabel}</strong>
        <UnfoldMoreRounded aria-hidden="true" />
      </button>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        onClose={handleClose}
        open={open}
        slotProps={{
          list: { "aria-label": label, dense: true },
          paper: {
            className: "adminStudentFilters__menuPaper",
            style: { minWidth: Math.max(anchorElement?.clientWidth ?? 0, 174) },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
      >
        {options.map((option) => (
          <MenuItem
            className="adminStudentFilters__menuItem"
            key={option.value}
            onClick={() => {
              onChange(option.value);
              handleClose();
            }}
            selected={option.value === value}
          >
            <span>{option.label}</span>
            {option.value === value ? <CheckRounded aria-hidden="true" /> : null}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export function AdminProvisionUserForm({ copy, groups, role }: AdminProvisionUserFormProps) {
  /* HOOKS */
  const provision = useAdminProvisionUser(copy, role);
  const [expanded, setExpanded] = useState(false);
  const contentId = `admin-provision-${role.toLowerCase()}`;
  const groupCopy = copy.studentGroup;
  const categoryOptions: ProvisionMenuOption[] = groupCopy
    ? groupCategories.map((category) => ({
        label: groupCopy.groupTypes[category],
        value: category,
      }))
    : [];
  const groupOptions: ProvisionMenuOption[] = groups
    .filter(
      (group) => group.category === provision.values.groupCategory && group.activeStudentCount < 15,
    )
    .map((group) => ({ label: group.name, value: group.id }));

  return (
    <section className="adminWorkspace__provision" data-expanded={expanded}>
      <div className="adminWorkspace__provisionHeader">
        <div className="adminWorkspace__provisionLead">
          <span>
            <AddCircleOutlineRounded aria-hidden="true" />
          </span>
          <div>
            <h2>{copy.title}</h2>
            <p>{copy.description}</p>
          </div>
        </div>
        <button
          aria-controls={contentId}
          aria-expanded={expanded}
          className="adminWorkspace__provisionTrigger"
          onClick={() => setExpanded((current) => !current)}
          type="button"
        >
          {expanded ? (
            <CloseRounded aria-hidden="true" />
          ) : (
            <PersonAddAlt1Rounded aria-hidden="true" />
          )}
          <span>{expanded ? copy.close : copy.submit}</span>
        </button>
      </div>

      {expanded ? (
        <div className="adminWorkspace__provisionBody" id={contentId}>
          <form className="adminWorkspace__provisionForm" onSubmit={provision.handleSubmit}>
            <label>
              <span>{copy.nameLabel}</span>
              <div>
                <PersonOutlineRounded aria-hidden="true" />
                <input
                  autoComplete="name"
                  maxLength={160}
                  name="displayName"
                  onChange={provision.handleChange}
                  placeholder={copy.namePlaceholder}
                  required
                  type="text"
                  value={provision.values.displayName}
                />
              </div>
            </label>
            <label>
              <span>{copy.emailLabel}</span>
              <div>
                <AlternateEmailRounded aria-hidden="true" />
                <input
                  autoComplete="email"
                  name="email"
                  onChange={provision.handleChange}
                  placeholder={copy.emailPlaceholder}
                  required
                  type="email"
                  value={provision.values.email}
                />
              </div>
            </label>
            <label>
              <span>{copy.passwordLabel}</span>
              <div>
                <LockRounded aria-hidden="true" />
                <input
                  aria-describedby={`${role.toLowerCase()}-password-hint`}
                  autoComplete="new-password"
                  maxLength={128}
                  minLength={12}
                  name="password"
                  onChange={provision.handleChange}
                  placeholder={copy.passwordPlaceholder}
                  required
                  type="password"
                  value={provision.values.password}
                />
              </div>
              <small id={`${role.toLowerCase()}-password-hint`}>{copy.passwordHint}</small>
            </label>
            <div className="adminWorkspace__provisionFooter">
              {role === "STUDENT" && groupCopy ? (
                <div className="adminWorkspace__provisionFilters">
                  <ProvisionMenu
                    label={groupCopy.groupTypeLabel}
                    onChange={(value) =>
                      provision.handleGroupCategoryChange(value as AdminProvisionGroupCategory)
                    }
                    options={categoryOptions}
                    placeholder={groupCopy.groupTypePlaceholder}
                    value={provision.values.groupCategory}
                  />
                  <ProvisionMenu
                    disabled={!provision.values.groupCategory || groupOptions.length === 0}
                    label={groupCopy.groupLabel}
                    onChange={provision.handleGroupChange}
                    options={groupOptions}
                    placeholder={groupCopy.groupPlaceholder}
                    value={provision.values.groupId}
                  />
                </div>
              ) : null}
              <div className="adminWorkspace__provisionActions">
                <button
                  className="adminWorkspace__provisionCancel"
                  disabled={provision.isSubmitting}
                  onClick={() => setExpanded(false)}
                  type="button"
                >
                  {copy.cancel}
                </button>
                <button
                  className="adminWorkspace__provisionSubmit"
                  disabled={provision.isSubmitting || !provision.isValid}
                  type="submit"
                >
                  <PersonAddAlt1Rounded aria-hidden="true" />
                  <span>{provision.isSubmitting ? copy.pending : copy.submit}</span>
                </button>
              </div>
            </div>
          </form>
          {provision.message ? (
            <p
              className={
                provision.message.kind === "success"
                  ? "adminWorkspace__provisionSuccess"
                  : "adminWorkspace__provisionError"
              }
              role={provision.message.kind === "error" ? "alert" : "status"}
            >
              {provision.message.text}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
