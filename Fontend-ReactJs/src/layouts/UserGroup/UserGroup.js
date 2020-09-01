import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Table, Tag, Space, Button, Tree, Modal, Card, Form, Input, Select } from 'antd';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import formatCheckKey from '../../helpers/utilities/formatCheckKey';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const ManagerGroup = (props) => {
    const columns = [
        {
            ellipsis: true,
            key: 'stt',
            dataIndex: 'groupId',
            title: 'STT',
            align: 'center',
            width: 150,
        },
        {
            key: 'groupName',
            dataIndex: 'groupName',
            title: 'Tên nhóm',
            align: 'center',
            width: 150,
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái',
            align: 'center',
            width: 150,
            render: status => {
                let tagName = status ? 'Đang hoạt động' : 'Ngưng hoạt động';
                return (
                    <Tag color={status ? 'green' : 'error'}>
                        {tagName.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Mô tả',
            align: 'center',
            width: 150,
        },
        {
            key: 'action',
            title: 'Hành động',
            align: 'center',
            width: 300,
            render: (text, record) => {
                return (
                    <Space>
                        <Button
                            type="primary"
                            shape="round"
                            size="small"
                            ghost
                            onClick={() => onClickClaim(record)}
                        >Cấp quyền</Button>
                        <Button
                            type="primary"
                            shape="round"
                            size="small"
                            block
                            onClick={() => onClickUpdate(record)}
                        >Cập nhật</Button>
                        <Button
                            type="primary"
                            shape="round"
                            size="small"
                            danger
                            onClick={() => confirm(record)}
                        >Xóa bỏ</Button>
                    </Space>
                );
            },
        },
    ];

    const { userGroups, roleClaims, fetchRoleClaimReq, insertUserGroupReq, updateUserGroupReq, updateRoleClaimReq, deleteUserGroupReq } = props;

    const [visibleClaim, setVisibleClaim] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleInsert, setVisibleInsert] = useState(false);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedUserGroup, setSelectedUserGroup] = useState({});

    useEffect(() => {
        setCheckedKeys(roleClaims.checkedKeys);
    }, [roleClaims])

    const confirm = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa bỏ',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chăc chắn muốn xóa '${record.groupName}'.`,
            okText: 'Xóa bỏ',
            cancelText: 'Hủy bỏ',
            onOk: () => {
                deleteUserGroupReq({ groupId: record.groupId });
            }
        });
    }

    const onClickClaim = (record) => {
        fetchRoleClaimReq({ group: record.groupName });
        setVisibleClaim(true);
        setSelectedUserGroup(record);
    }

    const onClickUpdate = (record) => {
        setVisibleUpdate(true);
        setSelectedUserGroup(record);
    }

    const onModalInsertGroupOk = () => {
        insertUserGroupReq({
            groupName: selectedUserGroup.groupName,
            isActive: selectedUserGroup.status,
            description: selectedUserGroup.description
        })
        setVisibleInsert(false);
    }

    const onModalUpdateGroupOk = () => {
        updateUserGroupReq(
            {
                groupName: selectedUserGroup.groupName,
                isActive: selectedUserGroup.status,
                description: selectedUserGroup.description,
                groupId: selectedUserGroup.groupId
            }
        );
        setVisibleUpdate(false);
    }

    const onModalClaimOk = () => {
        updateRoleClaimReq(formatCheckKey(checkedKeys, selectedUserGroup.groupId, roleClaims.leafKeys));
        setVisibleClaim(false)
    }

    const handleGroupNameChange = val => {
        setSelectedUserGroup({ ...selectedUserGroup, groupName: val.target.value.toUpperCase() })
    }

    const handleStatusChange = val => {
        setSelectedUserGroup({ ...selectedUserGroup, status: val })
    }

    const handleDescriptionChange = val => {
        setSelectedUserGroup({ ...selectedUserGroup, description: val.target.value })
    }

    const onCheck = (text, record) => {
        var filter = _.filter(record.checkedNodes, value => {
            return !value.children;
        })
        var lst = _.map(filter, value => {
            return value.key;
        })
        setCheckedKeys(lst);
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Quản trị nhóm người sử dụng</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Hệ thống</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Quản trị nhóm NSD </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                            <Space direction="vertical" style={{ width: '100%' }} >
                                                <Button type="primary" onClick={() => { setVisibleInsert(true); setSelectedUserGroup({ status: true }) }} >Thêm nhóm</Button>
                                                <Table
                                                    scroll={{ x: 240, y: 240 }}
                                                    pagination={false}
                                                    columns={columns} dataSource={userGroups} />
                                            </Space>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <Modal
                title={`Thêm nhóm mới`}
                visible={visibleInsert}
                onCancel={() => setVisibleInsert(false)}
                footer={[
                    <Button key="back" onClick={() => setVisibleInsert(false)} >
                        Hủy bỏ
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        onClick={() => onModalInsertGroupOk()} >
                        Thêm mới
                    </Button>,
                ]}
            >
                <Card>
                    <Form
                        labelCol={{ span: 4 }}
                    >
                        <Form.Item label="Tên nhóm">
                            <Input
                                value={selectedUserGroup.groupName}
                                onChange={handleGroupNameChange}
                            />
                        </Form.Item>
                        <Form.Item label="Trạng thái">
                            <Select
                                value={selectedUserGroup.status}
                                onChange={handleStatusChange}
                            >
                                <Option value={true} >Đang hoạt động</Option>
                                <Option value={false} >Ngưng hoạt động</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Mô tả">
                            <Input
                                value={selectedUserGroup.description}
                                onChange={handleDescriptionChange}
                            />
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>

            <Modal
                title={`Cập nhật nhóm "${selectedUserGroup.groupName}"`}
                visible={visibleUpdate}
                onCancel={() => setVisibleUpdate(false)}
                footer={[
                    <Button key="back" onClick={() => setVisibleUpdate(false)} >
                        Hủy bỏ
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        onClick={() => onModalUpdateGroupOk()} >
                        Cập nhật
                    </Button>,
                ]}
            >
                <Card>
                    <Form
                        labelCol={{ span: 4 }}
                    >
                        <Form.Item label="Tên nhóm">
                            <Input
                                value={selectedUserGroup.groupName}
                                onChange={handleGroupNameChange}
                            />
                        </Form.Item>
                        <Form.Item label="Trạng thái">
                            <Select
                                value={selectedUserGroup.status}
                                onChange={handleStatusChange}
                            >
                                <Option value={true} >Đang hoạt động</Option>
                                <Option value={false} >Ngưng hoạt động</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Mô tả">
                            <Input
                                value={selectedUserGroup.description}
                                onChange={handleDescriptionChange}
                            />
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>

            <Modal
                title={`Cấp quyền nhóm "${selectedUserGroup.groupName}"`}
                visible={visibleClaim}
                onCancel={() => setVisibleClaim(false)}
                footer={[
                    <Button key="back" onClick={() => setVisibleClaim(false)} >
                        Hủy bỏ
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => onModalClaimOk()} >
                        Cấp quyền
                    </Button>,
                ]}
            >
                <Card>
                    <Tree
                        blockNode
                        checkable
                        checkedKeys={checkedKeys}
                        treeData={roleClaims.treeData}
                        onCheck={onCheck}
                    >
                    </Tree>
                </Card>
            </Modal>

        </div>
    )
}

export default ManagerGroup;