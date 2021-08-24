import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLogoutUser } from "../../_reducers/user_reducer";

function FeedPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickLogout = () => {
    dispatch(getLogoutUser());
  };

  return (
    <div>
      메인페이지
      <button onClick={onClickLogout}>로그아웃</button>
    </div>
  );
}

export default FeedPage;
