import ContactForm from "@/components/contact/ContactForm";
import { Link } from "react-router";

export default function Contact() {
  return (
    <section className="grid divide-y divide-dashed divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <div className="flex flex-col gap-2 px-6 py-10 md:py-14">
        <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
          Send me a message
        </h4>
        <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
          Fill out the form below and I will get back to you as soon as
          possible.
        </p>
      </div>

      <div className="flex w-full items-center px-6 py-10 md:py-14">
        <ContactForm />
      </div>
    </section>
  );
}
