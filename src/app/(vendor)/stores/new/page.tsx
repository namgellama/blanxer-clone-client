"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateStore } from "@/api/vendor/store/hooks/useCreateStore";
import { setStore } from "@/redux/slices/vendor/store.slice";
import storeValidation, {
    CreateStoreFormFields,
} from "@/validations/vendor/store.validation";
import { Spinner } from "@/components/ui/spinner";

const page = () => {
    const form = useForm<CreateStoreFormFields>({
        resolver: zodResolver(storeValidation.createStore),
        defaultValues: {
            name: "",
            email: "",
            contactNumber: "",
            address: "",
        },
    });
    const { createStoreMutation, isLoading } = useCreateStore();
    const dispatch = useDispatch();

    const onSubmit = async (data: CreateStoreFormFields) => {
        const newStore = await createStoreMutation(data);
        dispatch(
            setStore({
                store: {
                    ...newStore,
                    userRole: "OWNER",
                },
            }),
        );
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create a store</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="form-store" onSubmit={form.handleSubmit(onSubmit)}>
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
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
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
                        <Controller
                            name="contactNumber"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contactNumber">
                                        Contact Number
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="contactNumber"
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
                        <Controller
                            name="address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="address">
                                        Address
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="address"
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
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="responsive">
                    <Button
                        type="submit"
                        form="form-store"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "Submit"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
};

export default page;
