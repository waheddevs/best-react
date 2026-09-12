"use client";

import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import AlternateEmailRounded from "@mui/icons-material/AlternateEmailRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";

import { Button } from "@/components/ui/Button";
import styles from "@/css/admin/workspace.module.css";
import { useAdminProvisionUser } from "@/hooks/admin/useAdminProvisionUser";
import type {
  AdminProvisionUserCopy,
  ProvisionableUserRole,
} from "@/types/admin/AdminProvisionUser";

type AdminProvisionUserFormProps = {
  copy: AdminProvisionUserCopy;
  role: ProvisionableUserRole;
};

export function AdminProvisionUserForm({ copy, role }: AdminProvisionUserFormProps) {
  /* HOOKS */
  const provision = useAdminProvisionUser(copy, role);

  return (
    <section className={styles.adminWorkspace__provision}>
      <div className={styles.adminWorkspace__provisionHeader}>
        <span>
          <AddCircleOutlineRounded aria-hidden="true" />
        </span>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
      </div>
      <form className={styles.adminWorkspace__provisionForm} onSubmit={provision.handleSubmit}>
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
        <Button
          disabled={provision.isSubmitting || !provision.isValid}
          shape="soft"
          size="medium"
          type="submit"
          variant="primary"
        >
          {provision.isSubmitting ? copy.pending : copy.submit}
        </Button>
      </form>
      {provision.message ? (
        <p
          className={
            provision.message.kind === "success"
              ? styles.adminWorkspace__provisionSuccess
              : styles.adminWorkspace__provisionError
          }
          role={provision.message.kind === "error" ? "alert" : "status"}
        >
          {provision.message.text}
        </p>
      ) : null}
    </section>
  );
}
