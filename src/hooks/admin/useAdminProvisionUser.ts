"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";

import {
  AdminProvisionUserDocument,
  type AdminProvisionUserMutation,
  type AdminProvisionUserMutationVariables,
} from "@/gql/graphql";
import { executePublicApi } from "@/lib/PublicApi";
import type {
  AdminProvisionGroupCategory,
  AdminProvisionUserCopy,
  AdminProvisionUserValues,
  ProvisionableUserRole,
} from "@/types/admin/AdminProvisionUser";

const initialValues: AdminProvisionUserValues = {
  displayName: "",
  email: "",
  groupCategory: "",
  groupId: "",
  password: "",
};

export function useAdminProvisionUser(copy: AdminProvisionUserCopy, role: ProvisionableUserRole) {
  /* HOOKS */
  const router = useRouter();
  const session = useSession();
  const [message, setMessage] = useState<{ kind: "error" | "success"; text: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);

  const isValid =
    values.displayName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) &&
    values.password.length >= 12 &&
    values.password.length <= 128 &&
    (role !== "STUDENT" || (values.groupCategory.length > 0 && values.groupId.length > 0));

  /* HANDLERS */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof AdminProvisionUserValues;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setMessage(undefined);
  };

  const handleGroupCategoryChange = (groupCategory: AdminProvisionGroupCategory) => {
    setValues((current) => ({ ...current, groupCategory, groupId: "" }));
    setMessage(undefined);
  };

  const handleGroupChange = (groupId: string) => {
    setValues((current) => ({ ...current, groupId }));
    setMessage(undefined);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accessToken = session.data?.bestApi?.accessToken;
    if (!accessToken || !isValid) {
      setMessage({ kind: "error", text: copy.error });
      return;
    }

    setIsSubmitting(true);
    setMessage(undefined);
    try {
      await executePublicApi<AdminProvisionUserMutation, AdminProvisionUserMutationVariables>(
        AdminProvisionUserDocument,
        {
          input: {
            displayName: values.displayName.trim(),
            email: values.email.trim(),
            ...(role === "STUDENT" ? { groupId: values.groupId } : {}),
            password: values.password,
            role,
          },
        },
        { accessToken, cache: "no-store" },
      );
      setValues(initialValues);
      setMessage({ kind: "success", text: copy.success });
      router.refresh();
    } catch {
      setMessage({ kind: "error", text: copy.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleChange,
    handleGroupCategoryChange,
    handleGroupChange,
    handleSubmit,
    isSubmitting,
    isValid,
    message,
    values,
  };
}
