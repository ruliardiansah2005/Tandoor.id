import { ReactNode, memo } from "react";

interface ChartWrapperProps {
  children: ReactNode;
  title?: string;
}

// Memoized wrapper to prevent unnecessary re-renders which can cause duplicate key warnings
export const ChartWrapper = memo(function ChartWrapper({ children, title }: ChartWrapperProps) {
  if (title) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold mb-6">{title}</h3>
        {children}
      </div>
    );
  }
  
  return <>{children}</>;
});