import { User } from '@types'

import styles from './friends-list.module.scss'

export const FriendsList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <ul className={styles.list}>
      {users.map((user, id) => (
        <li key={id} className={styles.list__item}>
          <p className={styles.item__text}>
            {user.first_name}&nbsp;{user.last_name}
          </p>
        </li>
      ))}
    </ul>
  )
}
