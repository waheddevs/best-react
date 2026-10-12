import { notFound, redirect } from "next/navigation";
import { auth } from "@/Auth";
import { isLocale } from "@/config/Locales";
import { AdminLedgerDetailDocument } from "@/gql/graphql";
import { executeApolloQuery } from "@/lib/apollo/ApolloServerClient";
import { AdminPaymentDetail } from "@/features/admin/operations/AdminPaymentDetail";
type PageProps = { params: Promise<{ locale: string; recordId: string }> };
export default async function AdminPaymentDetailPage({ params }: PageProps) {
  const { locale, recordId } = await params;
  if (!isLocale(locale)) notFound();
  const session = await auth();
  if (session?.bestApi?.role !== "ADMIN" || !session.bestApi.accessToken)
    redirect(`/${locale}/login?role=admin`);
  const data = await executeApolloQuery(
    AdminLedgerDetailDocument,
    { id: recordId },
    { accessToken: session.bestApi.accessToken, cache: "no-store" },
  );
  return <AdminPaymentDetail locale={locale} record={data.adminPaymentDetail} />;
}
