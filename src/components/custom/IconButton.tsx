import { ReactNode } from "react";

import { Button } from "../ui/button";

interface Props {
    icon: ReactNode;
    onClick: () => void;
    size?:
        | "icon"
        | "default"
        | "xs"
        | "sm"
        | "lg"
        | "icon-xs"
        | "icon-sm"
        | "icon-lg"
        | null
        | undefined;
    className?: string;
}

const IconButton = ({ icon, size = "icon", onClick, className }: Props) => {
    return (
        <Button
            size={size}
            variant="ghost"
            className={`bg-transparent ${className}`}
            onClick={onClick}
        >
            {icon}
        </Button>
    );
};

export default IconButton;
