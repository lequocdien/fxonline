import React, { useState } from 'react';
import _ from 'lodash';
import { Table, Tag, Space, Button, Modal, Card, Form, Input, Select, Col, Row, DatePicker } from 'antd';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const { Option } = Select;

const Trader = (props) => {
    const columns = [
        {
            key: 'action',
            title: 'Hành động',
            align: 'center',
            width: 250,
            render: (text, record) => {
                return (
                    <Space>
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
        {
            key: 'user_name',
            dataIndex: 'user_name',
            title: 'Tên đăng nhập',
            align: 'center',
            width: 200,
        },
        {
            key: 'group_name',
            dataIndex: 'group_name',
            title: 'Tên nhóm quyền',
            align: 'center',
            width: 200,
            render: group_name => {
                return <Tag color="#2db7f5">{group_name}</Tag>
            }
        },
        {
            key: 'status_acc',
            dataIndex: 'status_acc',
            title: 'Trạng thái tài khoản',
            align: 'center',
            width: 150,
            render: (status) => {
                return status ? <Tag color="success" >Đang hoạt động</Tag> : <Tag color="error" >Ngưng hoạt động</Tag>;
            }
        },
        {
            key: 'full_name',
            dataIndex: 'full_name',
            title: 'Họ và tên',
            align: 'center',
            width: 200,
        },
        {
            key: 'gender',
            dataIndex: 'gender',
            title: 'Giới tính',
            align: 'center',
            width: 100,
            render: (is_male) => {
                var text = is_male ? 'Nam' : 'Nữ';
                return (<Tag color="default" >{text}</Tag>)
            }
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            align: 'center',
            width: 200,
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: 'Số điện thoại',
            align: 'center',
            width: 200,
        },
        {
            key: 'identity_card',
            dataIndex: 'identity_card',
            title: 'CMND',
            align: 'center',
            width: 200,
            render: (identity_card) => {
                return (<NumberFormat value={identity_card} format="### ### ###" displayType="text" />)
            }
        },
        {
            key: 'issued_on',
            dataIndex: 'issued_on',
            title: 'Ngày cấp',
            align: 'center',
            width: 200,
            render: (issued_on) => {
                return Moment(issued_on).format('DD/MM/YYYY');
            }
        },
        {
            key: 'issued_by',
            dataIndex: 'issued_by',
            title: 'Nơi cấp',
            align: 'center',
            width: 200,
        },
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Địa chỉ',
            align: 'center',
            width: 200,
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Ghi chú',
            align: 'center',
            width: 200,
        },
    ];
    const { traders, group, createTraderReq, updateTraderReq, deleteTraderReq } = props;
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleInsert, setVisibleInsert] = useState(false);
    const [selectedTrader, setSelectedTrader] = useState({});

    const confirm = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa bỏ',
            okText: 'Xóa bỏ',
            cancelText: 'Hủy bỏ',
            content: `Bạn có chắc chắn muốn xóa '${record.user_name}'.`,
            onOk: () => {
                deleteTraderReq({ acc_id: record.acc_id });
            }
        })
    }

    const showGroup = (lstGroup) => {
        return _.map(lstGroup, o => <Option disabled={o.is_active ? false : true} key={o.group_id} value={o.group_id} > {o.group_name} </Option>)
    }

    const onClickUpdate = (record) => {
        setVisibleUpdate(true);
        setSelectedTrader(record);
    }

    const handleModalInsertOk = () => {
        createTraderReq(selectedTrader);
        setVisibleInsert(false);
    }

    const handleModalUpdateOk = () => {
        updateTraderReq(selectedTrader);
        setVisibleUpdate(false);
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Quản trị tài khoản nhà đầu tư</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Hệ thống</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Quản trị TKNDT </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                            <Space direction="vertical" style={{ width: '100%' }} >
                                                <Button type="primary" onClick={() => { setVisibleInsert(true); setSelectedTrader({ ...selectedTrader, issued_on: Moment(Date.now()).format('YYYY/MM/DD') }) }} >Thêm nhà đầu tư</Button>
                                                <Table
                                                    scroll={{ x: 240, y: 240 }}
                                                    pagination={false}
                                                    columns={columns}
                                                    dataSource={traders} />
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
                title={`Thêm tài khoản nhà đầu tư`}
                width={800}
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
                        onClick={() => handleModalInsertOk()}
                    >
                        Thêm mới
                    </Button>,
                ]}
            >
                <Card>
                    <Form
                        labelCol={{ span: 8 }}
                    >
                        <Row>
                            <Col span={12} >
                                <Form.Item label="Họ" >
                                    <Input
                                        name="first_name"
                                        value={selectedTrader.first_name}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, first_name: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Tên" >
                                    <Input
                                        name="last_name"
                                        value={selectedTrader.last_name}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, last_name: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Giới tính" >
                                    <Select
                                        name="gender"
                                        value={selectedTrader.gender}
                                        onChange={val => setSelectedTrader({ ...selectedTrader, gender: val })}
                                    >
                                        <Option value={true}>Nam</Option>
                                        <Option value={false}>Nữ</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Số điện thoại" >
                                    <NumberFormat
                                        format="### ### ####"
                                        customInput={Input}
                                        name="phone"
                                        value={selectedTrader.phone}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, phone: e.target.value })} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Email" >
                                    <Input
                                        name="email"
                                        value={selectedTrader.email}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, email: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="CMND" >
                                    {/* <Input
                                        name="identity_card"
                                        value={selectedTrader.identity_card}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, identity_card: e.target.value })}
                                    /> */}
                                    <NumberFormat
                                        customInput={Input}
                                        format="### ### ###"
                                        name="identity_card"
                                        value={selectedTrader.identity_card}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, identity_card: e.target.value })}
                                        mask="_"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Ngày cấp" >
                                    <DatePicker
                                        name="issued_on"
                                        format="DD/MM/YYYY"
                                        value={Moment(selectedTrader.issued_on, 'YYYY/MM/DD')}
                                        onChange={date => setSelectedTrader({ ...selectedTrader, issued_on: date._d })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Nơi cấp" >
                                    <Input
                                        name="issed_by"
                                        value={selectedTrader.issued_by}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, issued_by: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Địa chỉ" >
                                    <Input
                                        name="address"
                                        value={selectedTrader.address}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, address: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Tên đăng nhập" >
                                    <Input
                                        name="user_name"
                                        value={selectedTrader.user_name}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, user_name: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Trạng thái TK" >
                                    <Select
                                        name="status"
                                        value={selectedTrader.status_acc}
                                        onChange={val => setSelectedTrader({ ...selectedTrader, status_acc: val })}
                                    >
                                        <Option value={true} >Đang hoạt động</Option>
                                        <Option value={false}>Ngưng hoạt động</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Nhóm quyền" >
                                    <Select
                                        name="status"
                                        value={selectedTrader.group_id}
                                        onChange={val => setSelectedTrader({ ...selectedTrader, group_id: val })}
                                    >
                                        {showGroup(group)}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Ghi chú" >
                                    <Input
                                        name="description"
                                        value={selectedTrader.description}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, description: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Modal>

            <Modal
                title={`Cập nhật tài khoản nhà đầu tư '${selectedTrader.user_name}'`}
                width={800}
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
                        onClick={() => handleModalUpdateOk()}
                    >
                        Cập nhật
                    </Button>,
                ]}
            >
                <Card>
                    <Form
                        labelCol={{ span: 8 }}
                    >
                        <Row>
                            <Col span={12} >
                                <Form.Item label="Họ" >
                                    <Input
                                        name="first_name"
                                        value={selectedTrader.first_name}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, first_name: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Tên" >
                                    <Input
                                        name="last_name"
                                        value={selectedTrader.last_name}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, last_name: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Giới tính" >
                                    <Select
                                        name="gender"
                                        value={selectedTrader.gender}
                                        onChange={val => setSelectedTrader({ ...selectedTrader, gender: val })}
                                    >
                                        <Option value={true}>Nam</Option>
                                        <Option value={false}>Nữ</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Số điện thoại" >
                                    <NumberFormat
                                        format="### ### ####"
                                        customInput={Input}
                                        name="phone"
                                        value={selectedTrader.phone}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, phone: e.target.value })} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Email" >
                                    <Input
                                        name="email"
                                        value={selectedTrader.email}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, email: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="CMND" >
                                    {/* <Input
                                        name="identity_card"
                                        value={selectedTrader.identity_card}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, identity_card: e.target.value })}
                                    /> */}
                                    <NumberFormat
                                        customInput={Input}
                                        format="### ### ###"
                                        name="identity_card"
                                        value={selectedTrader.identity_card}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, identity_card: e.target.value })}
                                        mask="_"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Ngày cấp" >
                                    <DatePicker
                                        name="issued_on"
                                        format="DD/MM/YYYY"
                                        value={Moment(selectedTrader.issued_on, 'YYYY/MM/DD')}
                                        onChange={date => setSelectedTrader({ ...selectedTrader, issued_on: Moment(date).format('YYYY/MM/DD') })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Nơi cấp" >
                                    <Input
                                        name="issed_by"
                                        value={selectedTrader.issued_by}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, issued_by: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Địa chỉ" >
                                    <Input
                                        name="address"
                                        value={selectedTrader.address}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, address: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Trạng thái TK" >
                                    <Select
                                        name="status"
                                        value={selectedTrader.status_acc}
                                        onChange={val => setSelectedTrader({ ...selectedTrader, status_acc: val })}
                                    >
                                        <Option value={true} >Đang hoạt động</Option>
                                        <Option value={false}>Ngưng hoạt động</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Nhóm quyền" >
                                    <Select
                                        name="status"
                                        value={selectedTrader.group_id}
                                        onChange={val => setSelectedTrader({ ...selectedTrader, group_id: val })}
                                    >
                                        {showGroup(group)}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Ghi chú" >
                                    <Input
                                        name="description"
                                        value={selectedTrader.description}
                                        onChange={e => setSelectedTrader({ ...selectedTrader, description: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Modal>

        </div>
    )
}

export default Trader;