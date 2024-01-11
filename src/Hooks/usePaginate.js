import { useCallback, useMemo } from "react";
import { Pagination } from "react-bootstrap";

export const usePaginate = (page, data, setPage, totalLength) => {
  let callBacks=useMemo(()=>{
    let items = [];
    for (let number = 1; number <= totalLength; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  },[page,totalLength])
  
  const PagiNation = () => <Pagination size="sm">{callBacks}</Pagination>;
  return PagiNation;
};
