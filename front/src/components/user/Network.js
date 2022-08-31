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
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalUser, setTotalUser] = useState(20);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
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
    <Container fluid>
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
  );
}

export default Network;
