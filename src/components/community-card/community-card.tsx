import { useState } from 'react'

import { Group } from '@types'

import { FriendsList } from './friends-list/friends-list'

import styles from './community-card.module.scss'

export const CommunityCard: React.FC<Group> = ({ ...props }) => {
  const [isListOpen, setIsListOpen] = useState(false)
  const onFriendsClick = () => {
    setIsListOpen(!isListOpen)
  }

  return (
    <article className={styles.card}>
      <div className={styles.card__header}>
        <header className={styles.header__inner}>
          <h2 className={styles.card__title}>{props.name}</h2>
          {props.closed && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-lock'
            >
              <rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
          )}
        </header>
        {props.avatar_color && <div className={styles.card__logo} style={{ backgroundColor: props.avatar_color }} />}
      </div>
      <div className={styles.card__body}>
        <div className={styles.body__members}>Подписчики:&nbsp;{props.members_count}</div>
        {props.friends && (
          <div className={styles.body__friends} onClick={onFriendsClick}>
            <span className={styles.friends__count}>Друзья среди подписчиков:&nbsp;{props.friends.length}</span>
            {isListOpen && <FriendsList users={props.friends} />}
          </div>
        )}
      </div>
    </article>
  )
}
