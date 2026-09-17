export const teacherGroupCapacity = 15;

export function teacherGroupCapacityPercentage(learnerCount: number): number {
  return Math.min(100, Math.max(0, Math.round((learnerCount / teacherGroupCapacity) * 100)));
}
