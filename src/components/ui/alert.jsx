import React from 'react';

export function Alert({ className, ...props }) {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 ${className}`}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }) {
  return <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`} {...props} />;
}

export function AlertDescription({ className, ...props }) {
  return <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props} />;
}