import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.RevenueCreateArgs>({
  revenue: {
    one: {
      data: {
        title: 'String',
        customer: 'String',
        seasson: 'String',
        revenue: 9057049.314884037,
      },
    },
    two: {
      data: {
        title: 'String',
        customer: 'String',
        seasson: 'String',
        revenue: 8867154.225716095,
      },
    },
  },
})

export type StandardScenario = typeof standard
