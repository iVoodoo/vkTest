import React, { useEffect, useState } from 'react'

import { Group } from '@types'

import styles from './filters.module.scss'

interface FilterProps {
  groups: Group[]
  colors: string[]
  onChangeFilter: (filteredData: Group[]) => void
}

export const Filters: React.FC<FilterProps> = ({ groups, colors, onChangeFilter }) => {
  const [closedFilter, setClosedFilter] = useState<boolean | null>(null)
  const [friendsFilter, setFriendsFilter] = useState<boolean | null>(null)
  const [colorsFilter, setColorsFilter] = useState<string | null>(null)

  const applyFilters = () => {
    const filteredData = groups.filter((group) => {
      return (
        (closedFilter === null || group.closed === closedFilter) &&
        (friendsFilter === null || 'friends' in group === friendsFilter) &&
        (colorsFilter === null || group.avatar_color === colorsFilter)
      )
    })

    onChangeFilter(filteredData)
  }

  useEffect(() => {
    applyFilters()
  }, [closedFilter, friendsFilter, colorsFilter])

  const onClosedFilter = (value: string) => {
    switch (value) {
      case 'public':
        setClosedFilter(false)
        break
      case 'private':
        setClosedFilter(true)
        break
      default:
        setClosedFilter(null)
        break
    }
  }

  const onFriendsFilter = (value: string) => {
    switch (value) {
      case 'haveFriends':
        setFriendsFilter(true)
        break
      case 'noFriends':
        setFriendsFilter(false)
        break
      default:
        setFriendsFilter(null)
        break
    }
  }

  const onColorsFilter = (value: string) => {
    switch (value) {
      case 'all':
        setColorsFilter(null)
        break
      default:
        setColorsFilter(value)
        break
    }
  }

  return (
    <div className={styles.filters}>
      <label htmlFor='closed' className={styles.filter}>
        Тип сообщества:
        <select id='closed' onChange={(e) => onClosedFilter(e.target.value)}>
          <option value='all'>Все</option>
          <option value='public'>Открытое</option>
          <option value='private'>Закрытое</option>
        </select>
      </label>
      <label htmlFor='friends' className={styles.filter}>
        Общие группы с друзьями:
        <select id='friends' onChange={(e) => onFriendsFilter(e.target.value)}>
          <option value='all'>Все</option>
          <option value='haveFriends'>Да</option>
          <option value='noFriends'>Нет</option>
        </select>
      </label>
      <label htmlFor='color' className={styles.filter}>
        Цвет аватарки:
        <select id='color' onChange={(e) => onColorsFilter(e.target.value)}>
          <option value='all'>Любой</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
