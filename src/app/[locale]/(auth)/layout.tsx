/**
 * Auth shell — no SiteHeader / SiteFooter.
 * Full-bleed for login (Nexus) and placeholder auth screens.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate flex min-h-svh flex-1 flex-col bg-background">
      {children}
    </div>
  );
}
