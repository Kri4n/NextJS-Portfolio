import { AlertCircle, RefreshCw, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type ChatErrorCode =
  | "RATE_LIMITED_IP"
  | "RATE_LIMITED_GLOBAL"
  | "GEMINI_QUOTA"
  | "GEMINI_NETWORK"
  | "GEMINI_UNKNOWN"
  | "UNKNOWN"
  | string;

interface ChatErrorProps {
  message: string;
  code?: ChatErrorCode;
  onRetry?: () => void;
}

const isRetryable = (code?: string) =>
  code === "GEMINI_NETWORK" || code === "GEMINI_UNKNOWN" || code === "UNKNOWN";

const isQuotaError = (code?: string) =>
  code === "RATE_LIMITED_IP" ||
  code === "RATE_LIMITED_GLOBAL" ||
  code === "GEMINI_QUOTA";

export function ChatError({ message, code, onRetry }: ChatErrorProps) {
  const Icon = isQuotaError(code) ? Clock : AlertCircle;

  return (
    <Alert variant="destructive" className="my-2 flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        <AlertDescription className="text-sm">{message}</AlertDescription>
        {isRetryable(code) && onRetry && (
          <Button
            variant="outline"
            size="sm"
            className="w-fit gap-1.5 text-xs"
            onClick={onRetry}
          >
            <RefreshCw className="h-3 w-3" />
            Try again
          </Button>
        )}
      </div>
    </Alert>
  );
}
