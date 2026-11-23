/**
 * Auth shell — no SiteHeader / SiteFooter.
 * Full-bleed Nexus layout for login / register / forgot / reset / verify.
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
