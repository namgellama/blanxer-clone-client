import {
    AvatarFallback,
    AvatarImage,
    Avatar as ShadcnAvatar,
} from "@/components/ui/avatar";

const Avatar = ({ label }: { label: string }) => {
    return (
        <ShadcnAvatar size="lg">
            <AvatarImage src="" />
            <AvatarFallback className="bg-purple-100 font-semibold">
                {label}
            </AvatarFallback>
        </ShadcnAvatar>
    );
};

export default Avatar;
