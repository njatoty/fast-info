"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useDictionary } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/actions/contact";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const dict = useDictionary();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", subject: defaultSubject ?? "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContactMessage(values);
    if (result.success) {
      toast.success(dict.contact.form.toastSuccess);
      setSubmitted(true);
      reset();
    } else {
      toast.error(result.error ?? dict.contact.form.toastError);
    }
  }

  if (submitted) {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <p className="font-medium">{dict.contact.form.successTitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">{dict.contact.form.successDescription}</p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={() => setSubmitted(false)}>
          {dict.contact.form.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="contact-name">{dict.contact.form.name}</FieldLabel>
            <Input
              id="contact-name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className="rounded-none"
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="contact-email">{dict.contact.form.email}</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="rounded-none"
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-phone">{dict.contact.form.phone}</FieldLabel>
            <Input id="contact-phone" autoComplete="tel" className="rounded-none" {...register("phone")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-subject">{dict.contact.form.subject}</FieldLabel>
            <Input id="contact-subject" className="rounded-none" {...register("subject")} />
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">{dict.contact.form.message}</FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            aria-invalid={!!errors.message}
            className="rounded-none"
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        <Button
          type="submit"
          variant="cta"
          size="lg"
          disabled={isSubmitting}
          className="w-fit gap-2 rounded-full"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          {dict.contact.form.submit}
        </Button>
      </FieldGroup>
    </form>
  );
}
