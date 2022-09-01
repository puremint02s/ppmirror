import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

import Pagination from "./Pagination";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalUser, setTotalUser] = useState(20);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    const getUserList = async () => {
      try {
        const { data } = await Api.get(
          `userlist?page=${page}&perPage=${perPage}`
        );
        setUsers(data.users);
        setTotalUser(data.totalPage);
      } catch (err) {
        console.log(err);
      }
    };
    getUserList();
  }, [userState, navigate, page]);

  return (
<<<<<<< HEAD
    <>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="베스트 포트폴리오"
      ></Modal>
      <Container>
        <Row xs="auto" className="jusify-content-center">
          {users.map((user) => (
            <UserCard key={user.id} user={user} isNetwork />
          ))}
        </Row>
        <Pagination
          total={totalUser}
          perPage={perPage}
          page={page}
          setPage={setPage}
        />
      </Container>
    </>
=======
    <Container>
      <Row xs="auto" className="jusify-content-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
      <Pagination
        total={totalUser}
        perPage={perPage}
        page={page}
        setPage={setPage}
      />
    </Container>
>>>>>>> 8ca5873d14317b36a1a12a9c9dbc3c43c9cfa102
  );
}

export default Network;
