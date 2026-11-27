/** Marks the page for page-specific CSS hooks (the prototype used body[data-page]). */
export function PageChrome({ page, children }: { page: string; children: React.ReactNode }) {
  return <div data-page={page}>{children}</div>;
}
