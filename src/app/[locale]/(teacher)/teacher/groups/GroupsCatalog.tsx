"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import MeetingRoomRounded from "@mui/icons-material/MeetingRoomRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";

import { ScrollToTopLink } from "@/components/navigation/ScrollToTopLink";
import {
  teacherGroupCapacity,
  teacherGroupCapacityPercentage,
} from "@/config/teacher/TeacherGroupCapacity";
import type { Locale } from "@/config/Locales";
import { deleteConnectedTeacherGroup } from "@/features/teacher/groups/TeacherGroupActions";
import { TeacherPageHeader } from "@/features/teacher/layout/TeacherPageHeader";
import { useConfirmDialog } from "@/hooks/notifications/useConfirmDialog";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import type { TeacherCopy, TeacherGroup, TeacherGroupCategory } from "@/types/teacher/Teacher";

import { CreateGroupDialog } from "./CreateGroupDialog";

type GroupCategoryFilter = TeacherGroupCategory | "all";
const categoryFilters: GroupCategoryFilter[] = ["all", "ielts", "cefr", "generalEnglish"];

type GroupsCatalogProps = {
  connected: boolean;
  copy: TeacherCopy;
  groups: TeacherGroup[];
  locale: Locale;
};

export function GroupsCatalog({ connected, copy, groups, locale }: GroupsCatalogProps) {
  /* HOOKS */
  const [selectedCategory, setSelectedCategory] = useState<GroupCategoryFilter>("all");
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);
  const [hiddenGroupIds, setHiddenGroupIds] = useState<Set<string>>(() => new Set());
  const reduceMotion = useReducedMotion();
  const confirm = useConfirmDialog();
  const notifications = useNotifications();
  const router = useRouter();
  const displayedGroups = groups.filter((group) => !hiddenGroupIds.has(group.id));
  const visibleGroups =
    selectedCategory === "all"
      ? displayedGroups
      : displayedGroups.filter((group) => group.category === selectedCategory);

  /* HANDLERS */
  const handleCategoryChange = (_event: SyntheticEvent, category: GroupCategoryFilter) => {
    setSelectedCategory(category);
  };

  const handleDeleteClick = async (group: TeacherGroup) => {
    if (deletingGroupId) return;
    const accepted = await confirm({
      cancelLabel: copy.common.cancel,
      confirmLabel: copy.groups.deleteGroup,
      message: copy.groups.deleteGroupMessage.replace("{groupName}", group.name),
      title: copy.groups.deleteGroupTitle,
      tone: "danger",
    });
    if (!accepted) return;
    if (!connected) {
      notifications.error({
        icon: "delete",
        title: copy.groups.deleteGroup,
        message: copy.groups.deleteGroupUnavailable,
      });
      return;
    }
    setDeletingGroupId(group.id);
    try {
      const result = await deleteConnectedTeacherGroup(group.id);
      if (!result.ok || result.group.status !== "DELETED") {
        notifications.error({
          icon: "delete",
          title: copy.groups.deleteGroup,
          message:
            result.code === "CONFLICT"
              ? copy.groups.deleteGroupConflict
              : copy.groups.deleteGroupError,
        });
        return;
      }
      setHiddenGroupIds((current) => new Set(current).add(group.id));
      notifications.success({
        icon: "delete",
        title: copy.groups.deleteGroup,
        message: copy.groups.deleteGroupSuccess,
      });
      router.refresh();
    } catch {
      notifications.error({
        icon: "delete",
        title: copy.groups.deleteGroup,
        message: copy.groups.deleteGroupError,
      });
    } finally {
      setDeletingGroupId(null);
    }
  };

  return (
    <main>
      <TeacherPageHeader eyebrow={copy.groups.eyebrow} title={copy.groups.pageTitle} />
      <div className="teacherGroups__catalogToolbar">
        <Tabs
          aria-label={copy.groups.categoryFilter}
          className="teacherGroups__categoryTabs"
          onChange={handleCategoryChange}
          scrollButtons={false}
          value={selectedCategory}
          variant="scrollable"
        >
          {categoryFilters.map((category) => (
            <Tab
              aria-controls="teacher-groups-panel"
              className="teacherGroups__categoryTab"
              id={`teacher-groups-tab-${category}`}
              key={category}
              label={
                <span className="teacherGroups__categoryTabLabel">
                  <span className="teacherGroups__categoryName">
                    {copy.groups.categories[category]}
                  </span>
                  <span className="teacherGroups__categoryCount">
                    {category === "all"
                      ? displayedGroups.length
                      : displayedGroups.filter((group) => group.category === category).length}
                  </span>
                </span>
              }
              value={category}
            />
          ))}
        </Tabs>
        <CreateGroupDialog connected={connected} copy={copy} />
      </div>
      <AnimatePresence initial={false} mode="wait">
        <motion.section
          aria-labelledby={`teacher-groups-tab-${selectedCategory}`}
          className="teacherGroups__catalog"
          id="teacher-groups-panel"
          key={selectedCategory}
          role="tabpanel"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
        >
          {visibleGroups.map((group) => (
            <article className="teacherGroups__catalogCard" key={group.id}>
              <div className="teacherGroups__catalogCardHeader">
                <span className="teacherGroups__catalogIcon">
                  <GroupsRounded aria-hidden="true" />
                </span>
                <span className="teacherGroups__learnerCount">
                  {group.learnerCount}/{teacherGroupCapacity} {copy.groups.learners}
                </span>
              </div>
              <div className="teacherGroups__catalogTitleRow">
                <h2>{group.name}</h2>
                {group.category ? (
                  <span className="teacherGroups__categoryBadge">
                    {copy.groups.categories[group.category]}
                  </span>
                ) : null}
              </div>
              <dl className="teacherGroups__catalogMeta">
                <div>
                  <dt>
                    <MeetingRoomRounded aria-hidden="true" /> {copy.reception.room}
                  </dt>
                  <dd>{group.room}</dd>
                </div>
                <div>
                  <dt>
                    <CalendarMonthRounded aria-hidden="true" /> {copy.groups.lessonDays}
                  </dt>
                  <dd>{group.lessonDays[locale]}</dd>
                </div>
                <div>
                  <dt>
                    <ScheduleRounded aria-hidden="true" /> {copy.reception.time}
                  </dt>
                  <dd>{group.time}</dd>
                </div>
              </dl>
              <div className="teacherGroups__catalogProgress">
                <span>
                  <span
                    style={{ width: `${teacherGroupCapacityPercentage(group.learnerCount)}%` }}
                  />
                </span>
                <strong>{teacherGroupCapacityPercentage(group.learnerCount)}%</strong>
              </div>
              <div className="teacherGroups__cardActions">
                <button
                  aria-label={`${copy.groups.deleteGroup}: ${group.name}`}
                  className="teacherGroups__deleteButton"
                  disabled={Boolean(deletingGroupId)}
                  onClick={() => void handleDeleteClick(group)}
                  type="button"
                >
                  <DeleteOutlineRounded aria-hidden="true" />
                  <span>{copy.groups.deleteGroup}</span>
                </button>
                <ScrollToTopLink
                  aria-label={`${copy.groups.detail}: ${group.name}`}
                  className="teacherGroups__catalogLink"
                  href={`/${locale}/teacher/groups/${group.slug}`}
                >
                  <span>{copy.groups.detail}</span>
                  <ArrowForwardRounded aria-hidden="true" />
                </ScrollToTopLink>
              </div>
            </article>
          ))}
          {visibleGroups.length === 0 ? (
            <p className="teacherGroups__categoryEmpty">
              {selectedCategory === "all" ? copy.groups.noGroups : copy.groups.noGroupsInCategory}
            </p>
          ) : null}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
