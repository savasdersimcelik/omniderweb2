import { Container } from "@/components/layout/Container";

type LegalSubsection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  list_type?: "ul" | "ol";
};

type LegalWarning = {
  title?: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalSection = {
  id?: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  list_type?: "ul" | "ol";
  warning?: LegalWarning;
  subsections?: LegalSubsection[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  lastUpdatedIso?: string;
  intro: string[];
  sections: LegalSection[];
};

function HtmlText({
  html,
  as: Comp = "span",
  className,
}: {
  html: string;
  as?: "span" | "p" | "li";
  className?: string;
}) {
  return (
    <Comp className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function LegalListBlock({
  items,
  type = "ul",
}: {
  items: string[];
  type?: "ul" | "ol";
}) {
  const Comp = type === "ol" ? "ol" : "ul";
  return (
    <Comp className={type === "ol" ? "legal-list legal-list--ol" : "legal-list"}>
      {items.map((item, index) => (
        <HtmlText key={`${index}-${item.slice(0, 40)}`} as="li" html={item} />
      ))}
    </Comp>
  );
}

export function LegalDocument({
  eyebrow,
  title,
  subtitle,
  lastUpdatedLabel,
  lastUpdated,
  lastUpdatedIso,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <Container as="section" className="section legal-page">
      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading-page">{title}</h1>
        {subtitle ? <p className="text-body">{subtitle}</p> : null}
        <p className="text-sm font-semibold text-slate-500">
          {lastUpdatedLabel}:{" "}
          <time dateTime={lastUpdatedIso || lastUpdated}>{lastUpdated}</time>
        </p>
      </header>

      <article className="legal-prose mt-10">
        {intro.map((paragraph, index) => (
          <p key={`intro-${index}`}>{paragraph}</p>
        ))}

        {sections.map((section) => (
          <section
            key={section.id || section.title}
            id={section.id}
            className="legal-prose__section"
          >
            <h2>{section.title}</h2>

            {section.paragraphs?.map((paragraph, index) => (
              <HtmlText
                key={`${section.id || section.title}-p-${index}`}
                as="p"
                html={paragraph}
              />
            ))}

            {section.list && section.list.length > 0 ? (
              <LegalListBlock
                items={section.list}
                type={section.list_type === "ol" ? "ol" : "ul"}
              />
            ) : null}

            {section.warning ? (
              <div className="legal-prose__warning">
                {section.warning.title ? (
                  <p className="font-bold text-amber-800">
                    {section.warning.title}
                  </p>
                ) : null}
                {section.warning.paragraphs?.map((paragraph, index) => (
                  <p key={`warn-${index}`}>{paragraph}</p>
                ))}
                {section.warning.list && section.warning.list.length > 0 ? (
                  <ul className="legal-list">
                    {section.warning.list.map((item, index) => (
                      <li key={`warn-li-${index}`}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {section.subsections?.map((subsection) => (
              <div key={subsection.title} className="legal-prose__subsection">
                <h3>{subsection.title}</h3>
                {subsection.paragraphs?.map((paragraph, index) => (
                  <HtmlText
                    key={`${subsection.title}-p-${index}`}
                    as="p"
                    html={paragraph}
                  />
                ))}
                {subsection.list && subsection.list.length > 0 ? (
                  <LegalListBlock
                    items={subsection.list}
                    type={subsection.list_type === "ol" ? "ol" : "ul"}
                  />
                ) : null}
              </div>
            ))}
          </section>
        ))}
      </article>
    </Container>
  );
}
