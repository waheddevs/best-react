import ArticleRounded from "@mui/icons-material/ArticleRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";

import type { Locale } from "@/config/Locales";
import styles from "@/css/teacher/groups.module.css";
import sharedStyles from "@/css/teacher/shared.module.css";
import type {
  TeacherCopy,
  TeacherLessonMaterial,
  TeacherLessonSession,
} from "@/types/teacher/Teacher";

import { GroupWorkspaceCreateAction } from "../GroupWorkspaceCreateAction";
import { GroupWorkspaceSectionHeader } from "../GroupWorkspaceSectionHeader";

type GroupMaterialsProps = {
  copy: TeacherCopy;
  lessons: TeacherLessonSession[];
  locale: Locale;
  materials: TeacherLessonMaterial[];
};

const materialIcons = {
  article: ArticleRounded,
  book: AutoStoriesRounded,
  worksheet: DescriptionRounded,
};

export function GroupMaterials({ copy, lessons, locale, materials }: GroupMaterialsProps) {
  return (
    <section aria-labelledby="group-materials-title">
      <GroupWorkspaceSectionHeader
        action={<GroupWorkspaceCreateAction copy={copy} kind="material" />}
        description={copy.groupWorkspace.materialsDescription}
        id="group-materials-title"
        title={copy.groupWorkspace.materialsTitle}
      />

      {materials.length > 0 ? (
        <div className={styles.teacherGroups__resourceGrid}>
          {materials.map((material) => {
            const Icon = materialIcons[material.type];
            const lesson = lessons.find((item) => item.id === material.lessonId);
            return (
              <article className={styles.teacherGroups__resourceCard} key={material.id}>
                <span className={styles.teacherGroups__resourceIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <span className={styles.teacherGroups__typePill}>
                  {copy.groupWorkspace.materialTypes[material.type]}
                </span>
                <h3>{material.title[locale]}</h3>
                <p>{material.description[locale]}</p>
                <dl>
                  <div>
                    <dt>{copy.groupWorkspace.format}</dt>
                    <dd>{material.format}</dd>
                  </div>
                  <div>
                    <dt>{copy.groupWorkspace.topic}</dt>
                    <dd>{lesson?.topic[locale] ?? "—"}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={sharedStyles.teacherShared__emptyState}>
          <h3 className={sharedStyles.teacherShared__emptyTitle}>
            {copy.groupWorkspace.noMaterials}
          </h3>
        </div>
      )}
    </section>
  );
}
