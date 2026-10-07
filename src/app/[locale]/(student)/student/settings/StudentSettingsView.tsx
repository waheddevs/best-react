import type { Locale } from "@/config/Locales";
import type { StudentSettingsCopy } from "@/dictionaries/student/StudentSettings";
import { getStudentWorkspaceCopy } from "@/dictionaries/student/StudentWorkspace";
import { StudentSectionHero } from "@/features/student/workspace/StudentSectionHero";
import type { StudentAccountIdentity } from "@/types/student/StudentSettings";

import { StudentAccountSettings } from "./StudentAccountSettings";
import { StudentPasswordSettings } from "./StudentPasswordSettings";

type StudentSettingsViewProps = {
  connected: boolean;
  copy: StudentSettingsCopy;
  locale: Locale;
  profile: StudentAccountIdentity;
};

export function StudentSettingsView({
  connected,
  copy,
  locale,
  profile,
}: StudentSettingsViewProps) {
  const section = getStudentWorkspaceCopy(locale).sections.settings;

  return (
    <div className="studentSettingsPage">
      <StudentSectionHero
        description={section.description}
        eyebrow={section.eyebrow}
        kind="settings"
        locale={locale}
        preview={!connected}
        title={copy.account}
      />
      <StudentAccountSettings connected={connected} copy={copy} locale={locale} profile={profile} />
      <StudentPasswordSettings connected={connected} copy={copy} />
    </div>
  );
}
