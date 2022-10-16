import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import useSwr from "swr";
import useOnClickOutside from "./hooks";
import { fetcher, TUsersBioResponse, TUsersBio } from "api";
import { UserCard, MyInput, UserCardPopUp } from "./components";
import "./styles/App.scss";

interface ServerResponse {
  data: User[];
}

interface User {
  name: string;
  phone: string;
  email: string;
  address: string;
  position_name: string;
  department: string;
  hire_date: string;
}

const PAGINATION_PER_PAGE = 10;

function App(): JSX.Element {
  const lastElement = useRef(null);
  const ref = useRef();

  const [inputValue, setInputValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserBio, setSelectedUserBio] = useState<TUsersBio | null>(
    null
  );
  const [displayedUsers, setDisplayedUsers] = useState<TUsersBio[]>([]);

  const { data: users, isValidating } = useSwr<TUsersBioResponse>(
    "http://127.0.0.1:3000",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  console.log(users);

  const filteredData: TUsersBio[] = useMemo(() => {
    if (!users) {
      return [];
    }

    if (!inputValue) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, users]);

  const handleSelectUser = useCallback((userBio: TUsersBio) => {
    setSelectedUserBio(userBio);

    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (!displayedUsers.length && filteredData.length && !inputValue) {
      setDisplayedUsers(filteredData.slice(0, PAGINATION_PER_PAGE));
    }
  }, [filteredData, displayedUsers, inputValue]);

  console.log(displayedUsers);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const paginationHandler = useCallback(() => {
    setDisplayedUsers((prevState) =>
      filteredData.slice(0, prevState.length + PAGINATION_PER_PAGE)
    );
  }, [filteredData]);

  useEffect(() => {
    const { current: trigger } = lastElement;
    const observer = new IntersectionObserver(paginationHandler, options);

    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) {
        observer.unobserve(trigger);
      }
    };
  }, [lastElement, paginationHandler]);

  useOnClickOutside(ref, () => setIsModalOpen(false));

  return (
    <div className="App">
      {isModalOpen && (
        <div ref={ref}>
          <UserCardPopUp userBio={selectedUserBio} setIsOpen={setIsModalOpen} />
        </div>
      )}
      <MyInput
        className="search"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="content">
        {displayedUsers.map((userBio, index) => (
          <UserCard
            key={`${userBio.name}-${userBio.email}`}
            onSelectUser={handleSelectUser}
            userBio={userBio}
          />
        ))}
        <div ref={lastElement} />
      </div>
    </div>
  );
}

export default App;
