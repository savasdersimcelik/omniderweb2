export default function MarketingLoading() {
  return (
    <div className="route-loading" aria-busy="true" aria-live="polite">
      <div className="route-loading__bar" />
      <div className="route-loading__body">
        <div className="route-loading__line route-loading__line--lg" />
        <div className="route-loading__line" />
        <div className="route-loading__line route-loading__line--sm" />
        <div className="route-loading__block" />
      </div>
    </div>
  );
}
