
import ContactForm from '@/components/contact/ContactForm'
import { Separator } from '@/components/ui/separator'

export default function Contact() {
  return (
        <div className="space-y-8">

            {/* Separator */}
            <Separator />

            {/* Contact Form */}
            <div className="mx-auto max-w-2xl">
              <ContactForm />
            </div>
        </div>
  )
}
