import type { StudentAccountIdentity } from "@/types/student/StudentSettings";

// Fictional preview identity; connected settings always load the authenticated profile.
export const studentSettingsPreview: StudentAccountIdentity = {
  avatarMediaObjectId: null,
  avatarUrl: null,
  displayName: "Dilnoza Karimova",
  email: "dilnoza.karimova@example.com",
  phone: "+998000000000",
};
