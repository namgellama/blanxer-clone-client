import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

const ErrorAlert = ({ message }: { message: string }) => {
    return (
        <Alert variant="destructive" className="max-w-md">
            <AlertCircle />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
};

export default ErrorAlert;
