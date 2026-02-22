import { Toaster } from "sonner";
import { PathTracker } from "../components/PathTracker";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import AxiosConfig from "@/config/axiosConfig";
import ScrollToTop from "@/lib/ScrollToTop";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AxiosConfig>
          <Toaster
            richColors
            position="top-right"
            visibleToasts={3}
            closeButton={true}
          />
          <PathTracker />
          <ScrollToTop />
          {children}
      </AxiosConfig>
    </ErrorBoundary>
  );
}
