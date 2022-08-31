import styled from "styled-components";

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;

  button {
    width: 80px;
    border: none;
    font-size: 1.5rem;
    padding: 20px;

    &:hover {
      background: gray;
    }
  }
`;

const Pagination = ({ total, page, setPage }) => {
  return (
    <PageButton>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(total)
        .fill()
        .map((v, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === total}>
        &gt;
      </button>
    </PageButton>
  );
};

export default Pagination;
