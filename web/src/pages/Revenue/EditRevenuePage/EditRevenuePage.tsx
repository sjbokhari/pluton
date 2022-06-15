import EditRevenueCell from 'src/components/Revenue/EditRevenueCell'

type RevenuePageProps = {
  id: string
}

const EditRevenuePage = ({ id }: RevenuePageProps) => {
  return <EditRevenueCell id={id} />
}

export default EditRevenuePage
