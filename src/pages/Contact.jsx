import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'

const contactDetails = [
  {
    label: 'Location',
    value: 'Mangalore, Karnataka',
  },
  {
    label: 'Email',
    value: 'support@worknest.com',
    href: 'mailto:support@worknest.com',
  },
  {
    label: 'Phone',
    value: '+91 98765 43210',
  },
]

function Contact() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_12px_30px_rgba(30,58,138,0.07)]">
        <h1 className="text-3xl font-semibold text-[#111827]">Contact Us</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#6B7280] sm:text-base">
          Have questions about workspace bookings, subscription plans, or room availability? Reach out to the WorkNest team.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {contactDetails.map((detail) => (
          <Card key={detail.label} title={detail.label}>
            {detail.href ? (
              <a href={detail.href} className="text-sm font-semibold text-[#1E3A8A]">
                {detail.value}
              </a>
            ) : (
              <p className="text-sm font-semibold text-[#111827]">{detail.value}</p>
            )}
          </Card>
        ))}
      </section>

      <Card title="Send Message">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full Name" name="fullName" placeholder="Enter full name" />
          <Input label="Email" type="email" name="email" placeholder="Enter email" />
          <Input label="Mobile Number" name="mobileNumber" placeholder="Enter mobile number" />
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Message</span>
            <textarea
              name="message"
              rows="5"
              placeholder="Enter your message"
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-3 text-sm text-[#111827] shadow-sm shadow-blue-900/5 outline-none placeholder:text-[#6B7280] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>

        <div className="mt-6">
          <Button>Send Message</Button>
        </div>
      </Card>
    </div>
  )
}

export default Contact
