type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  contactTitle: string;
  contactBody: string;
  contactEmail: string;
};

export function LegalDocument({
  eyebrow,
  title,
  subtitle,
  lastUpdatedLabel,
  lastUpdated,
  intro,
  sections,
  contactTitle,
  contactBody,
  contactEmail,
}: LegalDocumentProps) {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4 border-b border-line pb-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading-page">{title}</h1>
        <p className="text-body">{subtitle}</p>
        <p className="text-sm text-ink-subtle">
          {lastUpdatedLabel}: <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>
      </header>

      <div className="space-y-4 text-body">
        {intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      <div className="space-y-10">
        {sections.map((section, index) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {index + 1}. {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-body">
                {paragraph}
              </p>
            ))}
            {section.list && section.list.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-ink-muted">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <section className="space-y-3 rounded-2xl border border-line bg-surface-muted p-6">
        <h2 className="text-lg font-semibold text-ink">{contactTitle}</h2>
        <p className="text-sm leading-6 text-ink-muted">{contactBody}</p>
        <a
          href={`mailto:${contactEmail}`}
          className="link-brand text-sm font-semibold"
        >
          {contactEmail}
        </a>
      </section>
    </article>
  );
}
