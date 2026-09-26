"use client";

import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { createConnectedStudentInGroup } from "@/features/teacher/groups/TeacherGroupActions";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { normalizePhoneNumber, validatePhoneNumber } from "@/lib/PhoneNumber";
import type { TeacherCopy } from "@/types/teacher/Teacher";

type StudentField = "firstName" | "lastName" | "phone" | "email" | "password";
type StudentValues = Record<StudentField, string>;
type StudentErrors = Partial<Record<StudentField, string>>;

type TeacherAddStudentDialogProps = {
  atCapacity: boolean;
  connected: boolean;
  copy: TeacherCopy;
  groupId: string;
  onClose: () => void;
  onStudentCreated: (membershipId: string) => void;
};

const emptyValues: StudentValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
};

function validate(values: StudentValues, copy: TeacherCopy): StudentErrors {
  const labels = copy.groups.addStudentForm;
  const errors: StudentErrors = {};
  if (!values.firstName.trim() || values.firstName.trim().length > 80) {
    errors.firstName = labels.firstNameError;
  }
  if (!values.lastName.trim() || values.lastName.trim().length > 80) {
    errors.lastName = labels.lastNameError;
  }
  if (values.firstName.trim().length + values.lastName.trim().length + 1 > 160) {
    errors.lastName = labels.lastNameError;
  }
  if (!validatePhoneNumber(values.phone)) errors.phone = labels.phoneError;
  const email = values.email.trim();
  if (email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = labels.emailError;
  }
  if (values.password.length < 12 || values.password.length > 128) {
    errors.password = labels.passwordError;
  }
  return errors;
}

export function TeacherAddStudentDialog({
  atCapacity,
  connected,
  copy,
  groupId,
  onClose,
  onStudentCreated,
}: TeacherAddStudentDialogProps) {
  const [values, setValues] = useState<StudentValues>(emptyValues);
  const [errors, setErrors] = useState<StudentErrors>({});
  const [touched, setTouched] = useState<Partial<Record<StudentField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const notifications = useNotifications();
  const labels = copy.groups.addStudentForm;
  const fields: Array<{
    autoComplete: string;
    label: string;
    maxLength: number;
    name: StudentField;
    type: string;
  }> = [
    {
      autoComplete: "given-name",
      label: labels.firstName,
      maxLength: 80,
      name: "firstName",
      type: "text",
    },
    {
      autoComplete: "family-name",
      label: labels.lastName,
      maxLength: 80,
      name: "lastName",
      type: "text",
    },
    { autoComplete: "tel", label: labels.phone, maxLength: 32, name: "phone", type: "tel" },
    { autoComplete: "email", label: labels.email, maxLength: 320, name: "email", type: "email" },
    {
      autoComplete: "new-password",
      label: labels.password,
      maxLength: 128,
      name: "password",
      type: "password",
    },
  ];

  const close = () => {
    if (!pending) onClose();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const nextErrors = validate(values, copy);
    setSubmitted(true);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) return;
    if (atCapacity) {
      setFormError(copy.groups.groupCapacityReached);
      return;
    }
    if (!connected) {
      setFormError(copy.groups.addLearnerUnavailable);
      return;
    }
    setPending(true);
    try {
      const result = await createConnectedStudentInGroup({
        email: values.email.trim().toLowerCase(),
        firstName: values.firstName.trim().replace(/\s+/g, " "),
        groupId,
        lastName: values.lastName.trim().replace(/\s+/g, " "),
        password: values.password,
        phone: normalizePhoneNumber(values.phone),
      });
      if (!result.ok) {
        if (result.field) {
          const field = result.field;
          setErrors((current) => ({
            ...current,
            [field]:
              field === "email" && result.code === "CONFLICT"
                ? labels.emailConflict
                : labels[`${field}Error`],
          }));
        } else if (result.code === "CONFLICT") {
          setFormError(copy.groups.groupCapacityReached);
        } else {
          setFormError(labels.saveError);
        }
        return;
      }
      setValues(emptyValues);
      onStudentCreated(result.membership.membershipId);
      onClose();
      notifications.success({ title: copy.groups.addLearner, message: labels.saveSuccess });
      router.refresh();
    } catch {
      setFormError(labels.saveError);
    } finally {
      setPending(false);
    }
  };

  const renderField = (field: (typeof fields)[number]) => {
    const error = submitted || touched[field.name] ? errors[field.name] : undefined;
    const id = `teacher-add-student-${field.name}`;
    return (
      <div className="teacherGroups__createField" key={field.name}>
        <label className="teacherGroups__createFieldLabelHidden" htmlFor={id}>
          {field.label}
        </label>
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          autoComplete={field.autoComplete}
          id={id}
          maxLength={field.maxLength}
          name={field.name}
          onBlur={() => {
            setTouched((current) => ({ ...current, [field.name]: true }));
            setErrors((current) => ({
              ...current,
              [field.name]: validate(values, copy)[field.name],
            }));
          }}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setValues((current) => ({ ...current, [field.name]: value }));
            setErrors((current) => ({
              ...current,
              [field.name]: validate({ ...values, [field.name]: value }, copy)[field.name],
            }));
          }}
          placeholder={field.label}
          required
          type={field.type}
          value={values[field.name]}
        />
        <span
          className="teacherGroups__createFieldError"
          data-visible={Boolean(error)}
          id={`${id}-error`}
          role={error ? "alert" : undefined}
        >
          {error}
        </span>
      </div>
    );
  };

  return (
    <Dialog
      aria-labelledby="teacher-add-student-title"
      onClose={close}
      open
      slotProps={{
        backdrop: { className: "teacherGroups__createBackdrop" },
        paper: { className: "teacherGroups__createPaper" },
      }}
    >
      <form className="teacherGroups__createForm" noValidate onSubmit={submit}>
        <h2 id="teacher-add-student-title">{copy.groups.addLearner}</h2>
        <div className="teacherGroups__createGrid">{fields.slice(0, 2).map(renderField)}</div>
        <div className="teacherGroups__createGrid">
          {renderField(fields[2])}
          {renderField(fields[4])}
        </div>
        {renderField(fields[3])}
        {formError ? (
          <p className="teacherGroups__createError" role="alert">
            {formError}
          </p>
        ) : null}
        <div className="teacherGroups__createActions">
          <Button disabled={pending} onClick={close} shape="soft" size="small" variant="secondary">
            {copy.common.cancel}
          </Button>
          <Button
            disabled={pending}
            hoverEffect="jump"
            shape="soft"
            size="small"
            type="submit"
            variant="primary"
          >
            {copy.common.add}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
