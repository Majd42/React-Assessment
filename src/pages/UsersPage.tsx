import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import Table from "../components/Table";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUsers } from "../store/features/usersSlice";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const useSelector = useAppSelector;

  const total = useSelector((state) => state.users.total);
  const users = useSelector((state) => state.users.users);
  const loadingUsers = useSelector((state) => state.users.loadingUsers);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectQuery, setSelectQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [queryName, setQueryName] = useState("");
  const headers = [
    "FIRST NAME",
    "LAST NAME",
    "MAIDEN NAME",

    "AGE",
    "GENDER",
    "EMAIL",
    "USERNAME",
    "BLOOD GROUP",
    "EYE COLOR",
  ];

  const fields = [
    "firstName",
    "lastName",
    "maidenName",
    "age",
    "gender",
    "email",
    "username",
    "bloodGroup",
    "eyeColor",
  ];
  const filters = {
    gender: ["male", "female"],

    bloodGroup: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  };
  useEffect(() => {
    dispatch(
      getUsers({
        limit: pageSize,
        selectQuery: selectQuery,
        skip: activePage * pageSize - pageSize,
        queryName: queryName,
      })
    );
  }, [selectQuery, pageSize, activePage]);

  useEffect(() => {
    setActivePage(1);
  }, [selectQuery]);

  const filteredUsers = users.filter((user) =>
    (
      ["firstName", "email", "gender", "eyeColor"] as (keyof typeof user)[]
    ).some((key) =>
      user[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <div>
      <Filters
        filters={filters}
        setSelectQuery={setSelectQuery}
        setPageSize={setPageSize}
        setSearchQuery={setSearchQuery}
        setQueryName={setQueryName}
      />
      <Table
        data={filteredUsers}
        loading={loadingUsers}
        headers={headers}
        totalProducts={total}
        setActivePage={setActivePage}
        activePage={activePage}
        pageSize={pageSize}
        fields={fields}
      />
    </div>
  );
};

export default UsersPage;
