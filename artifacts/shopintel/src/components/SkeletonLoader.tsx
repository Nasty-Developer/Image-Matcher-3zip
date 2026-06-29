import React from 'react';

export function SkeletonCard({ height = 200, className = "" }: { height?: number; className?: string }) {
  return (
    <div 
      className={`skeleton-glass rounded-[14px] overflow-hidden relative ${className}`}
      style={{ height }}
    >
      <div className="skeleton-shimmer absolute inset-0" />
    </div>
  );
}

export function SkeletonText({ width = "100%", height = 16, className = "" }: { width?: string | number; height?: number; className?: string }) {
  return (
    <div 
      className={`skeleton-glass rounded-md overflow-hidden relative ${className}`}
      style={{ width, height }}
    >
      <div className="skeleton-shimmer absolute inset-0" />
    </div>
  );
}

export function SkeletonRow({ count = 3, height = 60, className = "" }: { count?: number; height?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="skeleton-glass rounded-lg overflow-hidden relative"
          style={{ height, width: "100%" }}
        >
          <div className="skeleton-shimmer absolute inset-0" />
        </div>
      ))}
    </div>
  );
}
