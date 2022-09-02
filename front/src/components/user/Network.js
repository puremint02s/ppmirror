import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";
import Modal from "../popup/modal";
import Pagination from "./Pagination";

function Network() {
  const navigate = useNavigate();
  const params = useParams();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalUser, setTotalUser] = useState(20);
  const [modalOpen, setModalOpen] = useState(true);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  
  const fetchNetwork = async (hashtag) => {
    const res = await Api.get("userlist", hashtag);
    const users = res.data;
    setUsers(users);
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    const getUserList = async () => {
      try {
        if (params.hashtag) {
          const hashtag = params.hashtag;
          fetchNetwork(hashtag);
        } else {
          const { data } = await Api.get(
            `userlist?page=${page}&perPage=${perPage}`
          );
          setUsers(data.users);
          setTotalUser(data.totalPage);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserList();
  }, [userState, navigate, page, params]);

  return (
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
  );
}

export default Network;
