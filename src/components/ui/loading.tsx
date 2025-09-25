import { Progress } from "./progress";

interface LoadingProps {
  isVisible: boolean;
}

export const Loading = ({ isVisible }: LoadingProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-mono font-medium tracking-wide">archive</h2>
        <div className="w-48">
          <Progress value={100} className="h-1" />
        </div>
      </div>
    </div>
  );
};