import { Skeleton } from '@/components/ui/skeleton'

function loading() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 p-8 rounded-lg gap-4 border">
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
    </div>
  )
}
export default loading
