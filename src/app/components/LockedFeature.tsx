import { Lock, Zap } from "lucide-react";

interface LockedFeatureProps {
  title: string;
  description: string;
  onClick: () => void;
  blur?: boolean;
  children?: React.ReactNode;
}

export function LockedFeature({ title, description, onClick, blur = true, children }: LockedFeatureProps) {
  return (
    <div className="relative">
      {children && blur && (
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
      )}
      
      <div className={`${children && blur ? 'absolute inset-0' : ''} flex items-center justify-center bg-gradient-to-br from-slate-50/95 to-blue-50/95 backdrop-blur-sm rounded-xl border-2 border-dashed border-green-300 p-8`}>
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-slate-600 mb-6">{description}</p>
          
          <button
            onClick={onClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Zap className="w-5 h-5" />
            Upgrade ke Premium
          </button>
        </div>
      </div>
    </div>
  );
}
