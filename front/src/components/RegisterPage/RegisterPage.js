import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../../styles/common/Button";
import Input from "../../styles/common/Input";
import { ErrorText } from "../../styles/Theme";
import { reducerUtils } from "../../utils/asyncUtils";
import { getRegisterUser } from "../../_reducers/user_reducer";

const RegisterPage = () => {
  const { data, error, loading } = useSelector(
    (state) => state.users.register || reducerUtils.initial()
  );
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, isSubmitting, errors }
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const emailRegExp = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  const nickNameRegExp = /^[0-9a-z]([0-9a-z_])*/i;

  useEffect(() => {
    if (
      dirtyFields.emailInput &&
      dirtyFields.nicknameInput &&
      dirtyFields.passwordInput
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [
    dirtyFields.emailInput,
    dirtyFields.nicknameInput,
    dirtyFields.passwordInput
  ]);

  useEffect(() => {
    if (!error && !loading && data) {
      history.push("/login");
    } else if (error && !loading && !data) {
      alert(error.message);
    }
  }, [data, dispatch, error, history, loading]);

  const onSubmitHanlder = (data) => {
    const lowerNickname = data.nicknameInput.toLowerCase();
    const body = {
      email: data.emailInput,
      name: data.nameInput,
      nickname: lowerNickname,
      password: data.passwordInput
    };
    dispatch(getRegisterUser(body));
  };

  return (
    <Section>
      <Form onSubmit={handleSubmit(onSubmitHanlder)}>
        <Input
          type="email"
          name="emailInput"
          placeholder="이메일"
          aria-label="email"
          {...register("emailInput", {
            required: true,
            pattern: emailRegExp
          })}
        />
        {errors.emailInput?.type === "required" && (
          <ErrorText>이메일을 입력해주세요.</ErrorText>
        )}
        {errors.emailInput?.type === "pattern" && (
          <ErrorText>유효하지 않은 이메일형식입니다.</ErrorText>
        )}
        <Input
          type="text"
          name="nameInput"
          aria-label="name"
          maxLength="30"
          placeholder="성명"
          {...register("nameInput")}
        />
        <Input
          type="text"
          name="nicknameInput"
          aria-label="nickname"
          minLength="3"
          maxLength="30"
          placeholder="사용자 이름"
          {...register("nicknameInput", {
            required: true,
            maxLength: 30,
            minLength: 3,
            pattern: nickNameRegExp
          })}
        />
        {errors.nicknameInput?.type === "required" && (
          <ErrorText>사용자 이름을 입력해주세요.</ErrorText>
        )}
        {(errors.nicknameInput?.type === "pattern" ||
          errors.nicknameInput?.type === "minLength" ||
          errors.nicknameInput?.type === "maxLength") && (
          <ErrorText>
            3~20자의 영문 소문자, 숫자와 밑줄(_)만 사용 가능합니다.
          </ErrorText>
        )}
        <Input
          type="password"
          name="passwordInput"
          placeholder="비밀번호"
          aria-label="password"
          {...register("passwordInput", { required: true, minLength: 6 })}
        />
        {errors.passwordInput?.type === "required" && (
          <ErrorText>비밀번호를 입력해주세요</ErrorText>
        )}
        {errors.passwordInput?.type === "minLength" && (
          <ErrorText>비밀번호는 최소 6자 이상이어야 합니다.</ErrorText>
        )}
        <Button type="submit" blur={!btnDisabled}>
          가입
        </Button>
      </Form>
    </Section>
  );
};

export default RegisterPage;

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
