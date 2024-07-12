import JobList from '@/components/JobList'
import SearchForm from '@/components/SearchForm'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getAllJobsAction } from '@/utils/actions'

async function JobsPage() {
  const queryClient = new QueryClient()
  // pre-fetching our data
  await queryClient.fetchQuery({
    queryKey: ['jobs', '', 'all'],
    // we are passing the empty object
    queryFn: () => getAllJobsAction({}),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobList />
    </HydrationBoundary>
  )
}
export default JobsPage
