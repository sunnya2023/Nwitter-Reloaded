import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../Firebase";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
const Card = styled.div`
  max-width: 580px;
  display: flex;
  border: 1px solid ${(props) => props.theme.textLighter};
  border-radius: 2rem;
  overflow: hidden;
`;
const Form = styled.form`
  display: flex;
  flex: 1;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Input = styled.input`
  width: 90%;
  padding: 1rem;
  background: transparent;
  color: ${(props) => props.theme.textLighter};
  border-bottom: 1px solid ${(props) => props.theme.textLighter};
  font-size: 1.6rem;
  cursor: pointer;

  &::placeholder {
    color: ${(props) => props.theme.textLighter};
    font-size: 1.2rem;
    text-transform: capitalize;
  }
`;
const Btn = styled.button`
  width: 10rem;
  margin: 0.8rem 0;
  border-radius: 0.7rem;
  padding: 0.8rem 1rem;
  text-align: center;
  color: ${(props) => props.theme.bg};
`;
const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
  background: ${(props) => props.theme.textLighter};
  padding: 2rem;
  a {
    color: ${(props) => props.theme.bg};
    font-size: 1.6rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Title = styled.h2`
  color: ${(props) => props.theme.bg};
  font-size: 2.4rem;
  font-weight: 600;
`;
const SubText = styled.p`
  color: ${(props) => props.theme.textGray};
  font-size: 1.4rem;
  line-height: 1.6rem;
`;
const LoginBtn = styled(Btn)`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.textLighter};
`;
interface IForm {
  username: string;
  email: string;
  password: string;
  password1: string;
}
function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();
  const onValid = async ({ username, email, password, password1 }: IForm) => {
    setLoading(true);
    if (password !== password1) {
      setError(
        "password1",
        { message: "password are not the same" },
        { shouldFocus: true }
      );
    } else if (loading || username === "" || email === " " || password === "")
      return;
    try {
      const crudentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(crudentials.user, {
        displayName: username,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(errors);
  return (
    <Wrapper>
      <Card>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", { required: true, minLength: 2 })}
            placeholder="Username"
            type="text"
          />
          <Input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: "이메일 형식에 맞게 입력해주세요",
              },
            })}
            placeholder="Email"
            type="email"
          />
          <Input
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Your password is too short",
              },
            })}
            placeholder="Password"
            type="password"
          />
          <Input
            {...register("password1", {
              required: true,
              minLength: {
                value: 6,
                message: "Your password is too short",
              },
            })}
            placeholder="Password 확인  "
            type="password"
          />
          <SubText>
            {errors?.password1?.message || errors.email?.message}
          </SubText>
          <Btn type="submit">Register</Btn>
        </Form>
        <Box>
          <Title>
            -<br />
            Storyville
            <br />-
          </Title>
          <SubText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
            id cum fugit doloribus assumenda optio!
          </SubText>
          <Link to={"/login"}>Already have an account?</Link>
          <LoginBtn>Login</LoginBtn>
        </Box>
      </Card>
    </Wrapper>
  );
}

export default CreateAccount;
