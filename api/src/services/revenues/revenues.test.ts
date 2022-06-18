import {
  revenues,
  revenue,
  createRevenue,
  updateRevenue,
  deleteRevenue,
} from './revenues'
import type { StandardScenario } from './revenues.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('revenues', () => {
  scenario('returns all revenues', async (scenario: StandardScenario) => {
    const result = await revenues()

    expect(result.length).toEqual(Object.keys(scenario.revenue).length)
  })

  scenario('returns a single revenue', async (scenario: StandardScenario) => {
    const result = await revenue({ id: scenario.revenue.one.id })

    expect(result).toEqual(scenario.revenue.one)
  })

  scenario('creates a revenue', async () => {
    const result = await createRevenue({
      input: {
        title: 'String',
        customer: 'String',
        seasson: 'String',
        revenue: 1441207.9460801387,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.customer).toEqual('String')
    expect(result.seasson).toEqual('String')
    expect(result.revenue).toEqual(1441207.9460801387)
  })

  scenario('updates a revenue', async (scenario: StandardScenario) => {
    const original = await revenue({ id: scenario.revenue.one.id })
    const result = await updateRevenue({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a revenue', async (scenario: StandardScenario) => {
    const original = await deleteRevenue({ id: scenario.revenue.one.id })
    const result = await revenue({ id: original.id })

    expect(result).toEqual(null)
  })
})
