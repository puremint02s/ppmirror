import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom';
import * as Api from "../../api";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header,portfolioOwnerId } = props;
  const [likeUser, setLikeUser] = useState([]);
  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users/maxlike").then((res) => setLikeUser(res.data));
  }, [likeUser]);
  
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modals' : 'modals'}>
      {open ? (
        <section style={customStyles}>
          <header style={{fontSize:'25px'}}>
            {header }
            <button className="close" onClick={close} style={buttonStyles}>&times;</button>
          </header>
          <main style={{fontSize:'20px',marginTop: '15px',color:'#0d6efd'}}>{likeUser[0]?.name}님 축하드립니다!!</main>
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
};
const customStyles = {
 
    top: '50%',
    left: '0',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '300px',
    height: '200px',
    position: 'fixed',
    zIndex: '99',
    top:'0',
    background: 'white',
    textAlign: 'center',
    paddingTop: '3%'

};
const buttonStyles = {
  right:'0',
  top:'0',
  position: 'absolute',
  width:'30px',
  fontSize:'15px'
};

export default Modal;
