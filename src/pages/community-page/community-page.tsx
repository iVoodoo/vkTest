import { useEffect, useState } from 'react'

import { CommunityCard, Filters } from '@components'
import { GetGroupsResponse, Group } from '@types'
import { getGroups } from '@utils/api'

import styles from './community-page.module.scss'

export const CommunityPage = () => {
  const [groups, setGroups] = useState<Group[] | undefined>([])
  const [filteredGroups, setFilteredGroups] = useState<Group[] | undefined>([])
  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: GetGroupsResponse = await getGroups()

        if (!response.data || response.result === 0) {
          throw new Error('Ууупс... Ошибка:( ')
        }

        setGroups(response.data)
        setFilteredGroups(response.data)
        const uniqueColors = new Set<string>()
        response.data.forEach((item) => {
          if (item.avatar_color) {
            uniqueColors.add(item.avatar_color)
          }
        })
        setColors([...uniqueColors])
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleFilter = (filteredData: Group[]) => {
    setFilteredGroups(filteredData)
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>Список сообществ</h1>
      {groups && <Filters groups={groups} colors={colors} onChangeFilter={handleFilter} />}
      <div className={styles['community-wrapper']}>{filteredGroups?.map((item) => <CommunityCard key={item.id} {...item} />)}</div>
    </section>
  )
}
