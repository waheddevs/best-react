import Skeleton from "@mui/material/Skeleton";

export default function TeacherLoading() {
  return (
    <main aria-busy="true" className="teacherLoading">
      <div>
        <Skeleton height={22} width={110} />
        <Skeleton height={52} width="42%" />
        <Skeleton height={24} width="64%" />
      </div>
      <section>
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton height={150} key={index} variant="rounded" />
        ))}
      </section>
    </main>
  );
}
