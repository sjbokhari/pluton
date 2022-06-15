import RevenueCell from 'src/components/Revenue/RevenueCell'

type RevenuePageProps = {
  id: string
}

const RevenuePage = ({ id }: RevenuePageProps) => {
  return <RevenueCell id={id} />
}

export default RevenuePage
