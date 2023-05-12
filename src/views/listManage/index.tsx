import React, { useEffect, useState } from "react";
import { deleteList, editList, fetchList } from "../../api";
import { ListItemType } from "../../types";
import qs from "qs";
import {
  Table,
  Button,
  Space,
  Modal,
  message as antdMessage,
  Row,
  Col,
  Input,
  Select,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Index: React.FC = () => {
  // 获取路由信息
  const location = useLocation();
  const navigate = useNavigate();
  // 获取查询字符串
  const [searchParams, setSearchParams] = useSearchParams();
  // 获取查询字符串
  const wd = searchParams.get("wd");
  const state = searchParams.get("state");

  // 数据
  const [list, setList] = useState<ListItemType[]>([]);
  // 弹框状态
  const [isShow, setIsShow] = useState(false);
  // 弹框数据
  const [dialogData, setDialogData] = useState<ListItemType>({
    id: "1",
    name: "张三",
    state: "3",
    address: "4",
    tel: "5",
    price: 100,
  });
  // 数据列
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "电话",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "操作",
      key: "opration",
      render(_: ListItemType) {
        return (
          <Space>
            <Button type="primary" onClick={() => openDialog(_)}>
              编辑
            </Button>
            <Button type="primary" danger onClick={() => handleDelete(_.id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 当前选中项目
  const [checkedKeys, setCheckedKeys] = useState<(string | number)[]>([]);

  // 数据请求
  const getList = async () => {
    const resp = await fetchList({ wd: wd || "", state: state || "" });
    setList(resp.data.data);
  };

  // 数据单个删除 || 数据多个删除
  const handleDelete = (id: string) => {
    // 二次确认
    Modal.confirm({
      title: "确认要删除吗?",
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确定",
      async onOk() {
        // 执行删除操作
        const resp = await deleteList(id);
        // 友好提示
        antdMessage.success(resp.data.message);
        // 重新请求最新列表
        getList();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // 编辑确定修改
  const handleEdit = async () => {
    // 请求编辑
    const resp = await editList(dialogData);
    // 友好提示
    antdMessage.success(resp.data.message);
    // 重新请求列表
    getList();
    // 关闭弹框
    setIsShow(false);
  };

  // 选中设置
  const rowSelection = {
    onChange(selectedRowKeys: (string | number)[]) {
      setCheckedKeys(selectedRowKeys);
    },
  };

  // 选中按钮
  const checkedDeleteBtn = checkedKeys.length > 0 && (
    <Button
      type="primary"
      danger
      onClick={() => handleDelete(checkedKeys.join(","))}
    >
      删除所选
    </Button>
  );

  // 点击编辑打开弹框
  const openDialog = (_: ListItemType) => {
    setIsShow(true);
    setDialogData(_);
  };

  // 搜索函数
  const onSearch = (value: string) => {
    if (state) {
      setSearchParams({
        wd: value,
        state,
      });
      return;
    }
    setSearchParams({
      wd: value,
    });
  };

  useEffect(() => {
    getList();
  }, [location]);

  return (
    <div>
      <Input.Search
        defaultValue={wd as string}
        placeholder="请搜索内容"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(value: string) => onSearch(value)}
      />
      <div>{checkedDeleteBtn}</div>
      <Table
        rowSelection={rowSelection}
        dataSource={list}
        columns={columns}
        rowKey={(row) => row.id}
      ></Table>
      <Modal
        open={isShow}
        title="编辑"
        cancelText="取消"
        okText="确定"
        onCancel={() => setIsShow(false)}
        onOk={() => handleEdit()}
      >
        <Row style={{ alignItems: "center", margin: "6px 0" }}>
          <Col span={4}>ID:</Col>
          <Col span={20}>
            <Input
              disabled={true}
              value={dialogData.id}
              onChange={(e) =>
                setDialogData({
                  ...dialogData,
                  id: e.target.value,
                })
              }
            ></Input>
          </Col>
        </Row>
        <Row style={{ alignItems: "center", margin: "6px 0" }}>
          <Col span={4}>姓名:</Col>
          <Col span={20}>
            <Input
              value={dialogData.name}
              onChange={(e) =>
                setDialogData({
                  ...dialogData,
                  name: e.target.value,
                })
              }
            ></Input>
          </Col>
        </Row>
        <Row style={{ alignItems: "center", margin: "6px 0" }}>
          <Col span={4}>地址:</Col>
          <Col span={20}>
            <Input
              value={dialogData.address}
              onChange={(e) =>
                setDialogData({
                  ...dialogData,
                  address: e.target.value,
                })
              }
            ></Input>
          </Col>
        </Row>
        <Row style={{ alignItems: "center", margin: "6px 0" }}>
          <Col span={4}>状态:</Col>
          <Col span={20}>
            <Select
              value={dialogData.state}
              onChange={(value) =>
                setDialogData({ ...dialogData, state: value })
              }
              options={[
                {
                  value: "已支付",
                  label: "已支付",
                },
                {
                  value: "待发货",
                  label: "待发货",
                },
                {
                  value: "已发货",
                  label: "已发货",
                },
                {
                  value: "代收货",
                  label: "代收货",
                },
                {
                  value: "已收货",
                  label: "已收货",
                },
                {
                  value: "已关闭",
                  label: "已关闭",
                },
              ]}
            ></Select>
          </Col>
        </Row>
        <Row style={{ alignItems: "center", margin: "6px 0" }}>
          <Col span={4}>电话:</Col>
          <Col span={20}>
            <Input
              value={dialogData.tel}
              onChange={(e) =>
                setDialogData({
                  ...dialogData,
                  tel: e.target.value,
                })
              }
            ></Input>
          </Col>
        </Row>
        <Row style={{ alignItems: "center", margin: "6px 0" }}>
          <Col span={4}>单价:</Col>
          <Col span={20}>
            <Input
              value={dialogData.price}
              onChange={(e) =>
                setDialogData({
                  ...dialogData,
                  price: +e.target.value,
                })
              }
            ></Input>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Index;
