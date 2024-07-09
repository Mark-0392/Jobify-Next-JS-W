'use server'

import prisma from './db'
import { auth } from '@clerk/nextjs'
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types'
import { redirect } from 'next/navigation'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { string } from 'zod'

function authenticateandRedirect(): string {
  const { userId } = auth()
  if (!userId) redirect('/')
  return userId
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  createAndEditJobSchema.parse(values)
  const userId = authenticateandRedirect()

  try {
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    })
    return job
  } catch (error) {
    console.log(error)
    return null
  }
}

type GetAllJobsActionType = {
  search?: string
  jobStatus?: string
  page?: number
  limit?: number
}

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionType): Promise<{
  jobs: JobType[]
  count: number
  page: number
  totalPages: number
}> {
  const userId = authenticateandRedirect()
  try {
    // for dynamic approach
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    }
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            // we are looking for search values
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      }
    }
    // first we hard-coding and then dynamically adding.
    const jobs: JobType[] = await prisma.job.findMany({
      // where: { clerkId: userId },
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error) {}
}
