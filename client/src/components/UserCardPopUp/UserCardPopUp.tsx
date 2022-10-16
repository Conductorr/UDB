import React from "react";
import { TUsersBio } from "api";
import styles from "./UserCardPopUp.module.scss";

type Props = {
  userBio: TUsersBio | null;
  setIsOpen: (status: boolean) => void;
};

function UserCardPopUp({ setIsOpen, userBio }: Props): JSX.Element | null {
  if (!userBio) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div className={styles.test}>
          <button
            onClick={() => setIsOpen(false)}
            className={styles.container__content__button}
          ></button>
        </div>
        <div className={styles.container__content__heading}>
          <h1 className={styles.container__content__heading__header}>
            {userBio.name}
          </h1>
        </div>
        <div className={styles.container__content__main}>
          <div className={styles.container__content__main__info}>
            <span>Телефон:</span>
            <span>Почта:</span>
            <span>Дата Приема:</span>
            <span>Должность:</span>
            <span className={styles.testing}>Подразделение:</span>
          </div>
          <div className={styles.container__content__main__contact}>
            <span>{userBio.phone}</span>
            <span>{userBio.email}</span>
            <span>{userBio.hire_date}</span>
            <span>{userBio.position_name}</span>
            <span>{userBio.department}</span>
          </div>
        </div>
        <div className={styles.container__content__footer}>
          <h6>Дополнительная информация:</h6>
          <p className={styles.lorem}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            consectetur dignissimos distinctio eaque impedit ipsum, itaque magni
            natus perferendis placeat provident quaerat repellat repudiandae
            tempora voluptates! {userBio.address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserCardPopUp;
