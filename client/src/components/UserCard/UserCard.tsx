import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { TUsersBio } from "api";
import styles from "./UserCard.module.scss";

type Props = {
  userBio: TUsersBio;
  onSelectUser: (userBio: TUsersBio) => void;
};

function UserCard({ userBio, onSelectUser }: Props) {
  const { name, phone, email } = userBio;

  return (
    <div
      onClick={() => {
        onSelectUser(userBio);
      }}
      className={styles.container}
    >
      <div className={styles.container_content}>
        <h1 className={styles.container_content__heading}>{name}</h1>
        <div className={styles.container_content__footer}>
          <div className={styles.container_content__footer__upper}>
            <FontAwesomeIcon style={{ color: "pink" }} icon={faMobile} />
            <span className={styles.container_content__footer__upper__number}>
              {phone}
            </span>
          </div>
          <div className={styles.container_content__footer__lower}>
            <FontAwesomeIcon style={{ color: "pink" }} icon={faEnvelope} />
            <a
              href="#"
              className={styles.container_content__footer__lower__number}
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
