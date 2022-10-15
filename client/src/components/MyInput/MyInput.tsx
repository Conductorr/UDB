import React from "react";
import styles from "./MyInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
};

function MyInput({ onChange, className }: Props) {
  return (
    <div className={styles.container}>
      <input
        onChange={onChange}
        className={styles.container__search}
        type="text"
        placeholder={"Поиск..."}
      />
      <FontAwesomeIcon
        style={{ color: "pink", height: "20px" }}
        className={styles.search}
        icon={faSearch}
      />
    </div>
  );
}

export default MyInput;
