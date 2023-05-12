import { Button, Form, Input, message as antdMessage } from "antd";
import React from "react";
import axios from "axios";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import request from "../../utils/request";
import {
  loginFailActionCreator,
  loginSuccessActionCreator,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "../../store/user/reducer";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: { username: string, password: string }) => {
    const resp = await login(values)

    const { code, data, message } = resp.data;

    if (code === 200) {
      dispatch(loginSuccessActionCreator(data));
      navigate("/");
      antdMessage.success(message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
