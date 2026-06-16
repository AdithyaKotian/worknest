import Card from '../components/Card'

const features = [
  {
    title: 'Flexible Workspace Booking',
    text: 'Book cabins, meeting rooms, conference rooms, and shared desks based on date and time.',
  },
  {
    title: 'Subscription Based Access',
    text: 'Choose plans for individuals, teams, and corporate workspace requirements.',
  },
  {
    title: 'Admin Managed Operations',
    text: 'Admins can manage room availability, bookings, payment records, cancellations, and refund status.',
  },
]

const reasons = [
  'Easy room availability checking',
  'Clean customer booking flow',
  'Subscription plan support',
  'Admin dashboard for workspace management',
]

function About() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_12px_30px_rgba(30,58,138,0.07)]">
        <h1 className="text-3xl font-semibold text-[#111827]">About WorkNest</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#6B7280] sm:text-base">
          WorkNest is a coworking space booking platform designed to help users easily find and book cabins, meeting rooms, conference spaces, and shared workspaces.
        </p>
      </section>

      <Card title="Who We Are">
        <p className="text-sm leading-6 text-[#6B7280]">
          WorkNest provides a simple and flexible workspace booking experience for individuals, teams, and businesses. Users can check availability, view workspace details, book time slots, choose subscription plans, and complete mock payment flow through the frontend interface.
        </p>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} title={feature.title}>
            <p className="text-sm leading-6 text-[#6B7280]">{feature.text}</p>
          </Card>
        ))}
      </section>

      <Card title="Why Choose WorkNest">
        <div className="grid gap-3 md:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason} className="rounded-lg border border-[#E5E7EB] bg-[#EFF6FF] px-4 py-3 text-sm font-medium text-[#111827]">
              {reason}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Our Mission">
        <p className="text-sm leading-6 text-[#6B7280]">
          Our mission is to make workspace booking simple, transparent, and efficient for customers and workspace administrators.
        </p>
      </Card>
    </div>
  )
}

export default About
