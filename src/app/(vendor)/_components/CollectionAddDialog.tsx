import { zodResolver } from "@hookform/resolvers/zod";
import { FileWithPath } from "@mantine/dropzone";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useUploadImage } from "@/api/shared/media/hooks/useUploadImage";
import { useCreateCollection } from "@/api/vendor/collection/hooks/useCreateCollection";
import { useUpdateCollection } from "@/api/vendor/collection/hooks/useUpdateCollection";
import { Dropzone } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/redux/hooks";
import { Collection } from "@/types/vendor/collection";
import collectionValidation, {
    CreateCollectionFormFields,
} from "@/validations/vendor/collection.validation";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    selectedItem?: Collection | null;
    setSelectedItem?: Dispatch<SetStateAction<Collection | null>>;
}

const CollectionAddDialog = ({
    isOpen,
    setIsOpen,
    selectedItem,
    setSelectedItem,
}: Props) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { store } = useAppSelector((state) => state.vendorStore);

    const form = useForm<CreateCollectionFormFields>({
        resolver: zodResolver(collectionValidation.createCollection),
        defaultValues: {
            name: selectedItem?.name ?? "",
            image: selectedItem?.image ?? "",
        },
    });

    const { createCollectionMutation, isLoading: isCreateCollectionLoading } =
        useCreateCollection();
    const { updateCollectionMutation, isLoading: isUpdateCollectionLoading } =
        useUpdateCollection();
    const { uploadImageMutation, isLoading: isUploadImageLoading } =
        useUploadImage();

    useEffect(() => {
        if (!selectedItem) return;

        form.setValue("name", selectedItem.name);
        form.setValue("image", selectedItem.image);
        setPreviewImage(selectedItem.image);
    }, [selectedItem, form]);

    const handleDrop = async (files: FileWithPath[]) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("store_id", store?.id ?? "");
        formData.append("prefix", "collection");

        const image = await uploadImageMutation(formData);
        setPreviewImage(image);
        form.setValue("image", image);
    };

    const onSubmit = async (data: CreateCollectionFormFields) => {
        if (!selectedItem) {
            if (previewImage)
                await createCollectionMutation({
                    ...data,
                    image: previewImage,
                });
        } else {
            await updateCollectionMutation({
                collectionId: selectedItem.id,
                data,
            });
        }
        form.reset();
        setIsOpen(false);
        setPreviewImage(null);
        setSelectedItem?.(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Collection</DialogTitle>
                </DialogHeader>

                <form
                    id="form-collection"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <div className="space-y-4">
                            <Label htmlFor="image">Image</Label>
                            <Dropzone
                                handleDrop={handleDrop}
                                handleReject={() =>
                                    toast.error("Error uploading file")
                                }
                                preview={previewImage}
                                setPreview={setPreviewImage}
                                props={{ style: { height: "200px" } }}
                            />
                        </div>
                    </FieldGroup>
                </form>

                <DialogFooter>
                    <Button
                        disabled={
                            isCreateCollectionLoading ||
                            isUpdateCollectionLoading ||
                            isUploadImageLoading
                        }
                        type="submit"
                        form="form-collection"
                        className="w-24"
                    >
                        {isCreateCollectionLoading ||
                        isUpdateCollectionLoading ||
                        isUploadImageLoading ? (
                            <Spinner />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CollectionAddDialog;
