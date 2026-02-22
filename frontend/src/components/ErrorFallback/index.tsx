import { environment } from "@/config/environment";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

// ErrorFallbackProps (Types)
interface ErrorFallbackProps {
    error: {
      message: string;
      stack: string;
    };
    resetErrorBoundary: (args: any) => void;
  }

export default function ErrorFallback({
    error,
    resetErrorBoundary,
  }: ErrorFallbackProps) {

    const handleHome = () => {
        window.location.href = environment.basename;
    }

    return (
      <div className="h-screen w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex flex-col items-center pt-6">
            {/* <AlertCircle className="w-12 h-12 text-destructive mb-2" /> */}
            <h2 className="text-2xl font-semibold text-foreground">
              Something went wrong
            </h2>
          </CardHeader>
  
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              {error?.message || 'Unknown error occurred'}
            </p>
          </CardContent>
  
          <CardFooter className="flex justify-center gap-4 pb-6">
            <Button onClick={handleHome}>
              Return to Home
            </Button>
            <Button onClick={resetErrorBoundary}>
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
}