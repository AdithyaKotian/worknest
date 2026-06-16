import Button from '../components/Button'
import Card from '../components/Card'
import { subscriptionPlans } from '../data/mockData'

const comparisonRows = [
  {
    feature: 'Booking Hours',
    basic: '10 hrs',
    premium: '30 hrs',
    corporate: '4 rooms allocated',
  },
  {
    feature: 'Shared Workspace',
    basic: 'Yes',
    premium: 'Yes',
    corporate: 'Yes',
  },
  {
    feature: 'Meeting Room Access',
    basic: 'Basic',
    premium: 'Priority',
    corporate: 'Corporate',
  },
  {
    feature: 'Admin Managed Bookings',
    basic: 'No',
    premium: 'No',
    corporate: 'Yes',
  },
  {
    feature: 'Support',
    basic: 'Email',
    premium: 'Faster Support',
    corporate: 'Priority Support',
  },
]

function getPlanAction(name) {
  return `Choose ${name.replace(' Plan', '')}`
}

function SubscriptionPlans() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Subscription Plans</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Choose a plan for flexible workspace access.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => {
          const isRecommended = Boolean(plan.recommended)

          return (
            <Card
              key={plan.id}
              className={[
                'flex h-full flex-col',
                isRecommended
                  ? 'border-[#1E3A8A] bg-[#EFF6FF] shadow-[0_18px_42px_rgba(30,58,138,0.14)]'
                  : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#1E3A8A]">
                    {plan.targetLabel}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-[#111827]">{plan.name}</h2>
                </div>

                {isRecommended && (
                  <span className="rounded-full bg-[#1E3A8A] px-3 py-1 text-xs font-semibold text-white">
                    Recommended
                  </span>
                )}
              </div>

              <p className="mt-5 text-3xl font-semibold text-[#1E3A8A]">{plan.price}</p>

              <ul className="mt-5 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-[#374151]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1E3A8A]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="mt-6 w-full">{getPlanAction(plan.name)}</Button>
            </Card>
          )
        })}
      </div>

      <Card title="Plan Comparison">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5E7EB] text-sm whitespace-nowrap">
            <thead className="bg-[#EFF6FF]">
              <tr className="text-left text-[#6B7280]">
                <th className="py-3 pr-4 font-medium">Feature</th>
                <th className="px-4 py-3 font-medium">Basic</th>
                <th className="px-4 py-3 font-medium text-[#1E3A8A]">Premium</th>
                <th className="py-3 pl-4 font-medium">Corporate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <td className="py-3 pr-4 font-medium text-[#111827]">{row.feature}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{row.basic}</td>
                  <td className="px-4 py-3 font-medium text-[#111827]">{row.premium}</td>
                  <td className="py-3 pl-4 text-[#6B7280]">{row.corporate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default SubscriptionPlans
