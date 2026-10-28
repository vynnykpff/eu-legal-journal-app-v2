import { getDoiUrl, getOrcidUrl, splitReferenceLinks } from "@/lib/article-links";
import type { Article } from "@/lib/types";

export function IdentifierLink({ value, type }: { value?: string; type: "doi" | "orcid" }) {
  const href = type === "doi" ? getDoiUrl(value) : getOrcidUrl(value);
  if (!href) return value || null;

  return <a className="[overflow-wrap:anywhere] text-primary underline underline-offset-2" href={href} target="_blank" rel="noreferrer">{href}</a>;
}

export function ReferenceCitation({ reference }: { reference: NonNullable<Article["references"]>[number] }) {
  const citation = reference.unstructured_citation ?? "";
  const doiUrl = getDoiUrl(reference.doi);
  const hasDoiInCitation = doiUrl && citation.toLowerCase().includes(doiUrl.replace("https://doi.org/", "").toLowerCase());

  return (
    <>
      {splitReferenceLinks(citation).map((part, index) => part.href
        ? <a key={index} className="[overflow-wrap:anywhere] text-primary underline underline-offset-2" href={part.href} target="_blank" rel="noreferrer">{part.text}</a>
        : <span key={index}>{part.text}</span>)}
      {!hasDoiInCitation && reference.doi && <>{citation && " "}<IdentifierLink type="doi" value={reference.doi} /></>}
    </>
  );
}
