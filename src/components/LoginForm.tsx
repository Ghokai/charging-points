import { Alert, Button, Form, Icon, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "../store";
import { loginUser } from "../store/actions/userLoginActions";
import Loader from "./Loader";

const FormWrapper = styled.div`
  min-width: 400px;
  .login-form-button {
    width: 100%;
  }
  .spinner {
    text-align: center;
  }
`;

interface LoginFormContainerProps {
  form: WrappedFormUtils;
}

//  programming-assignment@newmotion.com
//  sJAzpnqXPqo4!

const LoginFormContainer: React.FC<LoginFormContainerProps> = (
  props: LoginFormContainerProps
): React.ReactElement => {
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();
  const { error, isLoading, hasError } = useSelector(
    (state: AppState) => state.token
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        dispatch(loginUser(username, password));
      }
    });
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <h3>
          <u>Please login first to accessing charging points map.</u>
        </h3>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {hasError && <Alert message={error} type="error" />}

          {isLoading && <Loader />}

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isLoading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

const LoginForm = Form.create({ name: "LoginForm" })(LoginFormContainer);
export default LoginForm;
