import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../../styles/common/Input";
import Button from "../../styles/common/Button";
import { ErrorText } from "../../styles/Theme";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUser } from "../../_reducers/user_reducer";
import { reducerUtils } from "../../utils/asyncUtils";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const { data, error, loading } = useSelector(
    (state) => state.users.currentUser || reducerUtils.initial()
  );
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, isSubmitting, errors }
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (dirtyFields.emailInput && dirtyFields.passwordInput) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [dirtyFields.emailInput, dirtyFields.passwordInput]);

  useEffect(() => {
    if (!error && !loading && data) {
      history.push("/");
    }
  }, [data, dispatch, error, history, loading]);

  const onSubmitHanlder = (data) => {
    const body = {
      email: data.emailInput,
      password: data.passwordInput
    };
    dispatch(getLoginUser(body));
  };

  return (
    <>
      <Section>
        <LoginForm onSubmit={handleSubmit(onSubmitHanlder)}>
          <Input
            type="email"
            id="emailInput"
            name="emailInput"
            placeholder="이메일"
            aria-label="email"
            {...register("emailInput", {
              required: true
            })}
          />
          {errors.emailInput?.type === "required" && (
            <ErrorTextLogin>이메일을 입력해주세요</ErrorTextLogin>
          )}
          <Input
            type="password"
            id="passwordInput"
            name="passwordInput"
            placeholder="비밀번호"
            aria-label="password"
            {...register("passwordInput", { required: true })}
          />
          {errors.passwordInput?.type === "required" && (
            <ErrorTextLogin>비밀번호를 입력해주세요</ErrorTextLogin>
          )}
          <Button type="submit" blur={!btnDisabled}>
            로그인
          </Button>
        </LoginForm>
        {error && (
          <ErrorTextLogin className="login-error">
            {error.message}
          </ErrorTextLogin>
        )}
      </Section>
    </>
  );
};

export default LoginPage;

const Section = styled.section`
  max-width: 350px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 20px 40px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  ${(props) =>
    props.smallbox &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      padding: 25px 40px;
      span {
        font-size: 15px;
        margin-right: 10px;
      }
      button {
        font-size: 15px;
      }
    `}
  .login-error {
    margin-top: 7px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorTextLogin = styled(ErrorText)`
  margin-bottom: 5px;
  color: red;
  font-size: 14px;
  text-align: center;
  line-height: 1.4;
  word-break: keep-all;
`;
