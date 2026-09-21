"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/actions/contact";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
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
      toast.success("Message envoyé — nous vous répondrons rapidement.");
      setSubmitted(true);
      reset();
    } else {
      toast.error(result.error ?? "Une erreur est survenue. Merci de réessayer.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-border bg-card p-8 text-center">
        <p className="font-medium">Merci, votre message a bien été envoyé.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Notre équipe vous répondra dans les plus brefs délais.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="contact-name">Nom complet</FieldLabel>
            <Input id="contact-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="contact-email">E-mail</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-phone">Téléphone (optionnel)</FieldLabel>
            <Input id="contact-phone" autoComplete="tel" {...register("phone")} />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-subject">Sujet (optionnel)</FieldLabel>
            <Input id="contact-subject" {...register("subject")} />
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-fit gap-2">
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Envoyer le message
        </Button>
      </FieldGroup>
    </form>
  );
}
