import { GetGroupsResponse } from '@types'

export const getGroups = async (): Promise<GetGroupsResponse> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  const response = await fetch('/data/groups.json')
  const data = await response.json()

  return {
    result: 1,
    data
  }
}
