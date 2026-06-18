import { Group, Image, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import {
    DropzoneProps,
    FileRejection,
    FileWithPath,
    IMAGE_MIME_TYPE,
    Dropzone as MantineDropzone,
} from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { ImageIcon, Upload, X, XIcon } from "lucide-react";

import { IconButton } from "../custom";
import { Dispatch, SetStateAction } from "react";
import { useDeleteMedia } from "@/api/shared/media/hooks/useDeleteMedia";

interface Props {
    props?: Partial<DropzoneProps>;
    handleDrop: (files: FileWithPath[]) => void;
    handleReject: (files: FileRejection[]) => void;
    preview: string | null;
    setPreview: Dispatch<SetStateAction<string | null>>;
}

const Dropzone = ({
    props,
    handleDrop,
    handleReject,
    preview,
    setPreview,
}: Props) => {
    const { deleteMediaMutation, isLoading } = useDeleteMedia();

    return (
        <MantineProvider>
            {preview ? (
                <div className="flex flex-col items-end gap-2">
                    <IconButton
                        size="icon-xs"
                        icon={<XIcon className="size-4" />}
                        onClick={async (e) => {
                            e.stopPropagation();
                            await deleteMediaMutation(preview);
                            setPreview(null);
                        }}
                        className="border-2 rounded-full text-destructive"
                    />
                    <Image
                        src={preview}
                        alt="Collection Image"
                        className="size-96 object-cover"
                    />
                </div>
            ) : (
                <MantineDropzone
                    onDrop={(files) => handleDrop(files)}
                    onReject={(files) => handleReject(files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    {...props}
                >
                    <Group
                        justify="center"
                        gap="xl"
                        mih={220}
                        style={{ pointerEvents: "none" }}
                    >
                        <MantineDropzone.Accept>
                            <Upload
                                size={52}
                                color="var(--mantine-color-blue-6)"
                            />
                        </MantineDropzone.Accept>
                        <MantineDropzone.Reject>
                            <X size={52} color="var(--mantine-color-red-6)" />
                        </MantineDropzone.Reject>
                        <MantineDropzone.Idle>
                            <ImageIcon
                                size={52}
                                color="var(--mantine-color-dimmed)"
                            />
                        </MantineDropzone.Idle>
                    </Group>
                </MantineDropzone>
            )}
        </MantineProvider>
    );
};

export default Dropzone;
