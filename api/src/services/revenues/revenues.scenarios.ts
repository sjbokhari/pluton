import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.RevenueCreateArgs>({
  revenue: {
    one: {
      data: { title: 'String', customer_id: 'String', seasson_id: 'String' },
    },
    two: {
      data: { title: 'String', customer_id: 'String', seasson_id: 'String' },
    },
  },
})

export type StandardScenario = typeof standard
