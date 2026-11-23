import Image from "next/image";
import { cn } from "@/lib/utils";

const DEFAULT_FACES = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"] as const;

type UserTrustProps = {
  className?: string;
  faces?: readonly string[];
  rating: string;
  before?: string;
  count: string;
  after: string;
};

export function UserTrust({
  className,
  faces = DEFAULT_FACES,
  rating,
  before = "",
  count,
  after,
}: UserTrustProps) {
  const label = [before, count, after].filter(Boolean).join(" ");

  return (
    <div className={cn("user-trust", className)} aria-label={label}>
      <div className="user-trust__faces">
        {faces.map((face, index) => (
          <Image
            key={face}
            src={`/images/hero/trust/${face}`}
            alt=""
            width={48}
            height={48}
            className="user-trust__face"
            style={{ zIndex: index + 1 }}
          />
        ))}
      </div>
      <div className="user-trust__rating">
        <div className="user-trust__stars">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
          ))}
          <span>{rating}</span>
        </div>
        <p>
          {before ? <>{before} </> : null}
          <strong>{count}</strong> {after}
        </p>
      </div>
    </div>
  );
}
