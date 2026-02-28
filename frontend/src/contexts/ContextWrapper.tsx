import { Toaster } from "sonner";
import { PathTracker } from "../components/PathTracker";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import AxiosConfig from "@/config/axiosConfig";
import ScrollToTop from "@/lib/ScrollToTop";
import { Provider } from "react-redux";
import store from "@/redux/store";
import AppWrapper from "./AppWrapper";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <AxiosConfig>
            <Toaster
              richColors
              position="bottom-right"
              visibleToasts={3}
              closeButton={true}
            />
            <PathTracker />
            <ScrollToTop />
            <AppWrapper>{children}</AppWrapper>
        </AxiosConfig>
      </Provider>
    </ErrorBoundary>
  );
}
