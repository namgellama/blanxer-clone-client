import { ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
    icon: ReactNode;
    onClick: () => void;
}

const IconButton = ({ icon, onClick }: Props) => {
    return (
        <Button
            size="icon"
            variant="ghost"
            className="bg-transparent"
            onClick={onClick}
        >
            {icon}
        </Button>
    );
};

export default IconButton;
