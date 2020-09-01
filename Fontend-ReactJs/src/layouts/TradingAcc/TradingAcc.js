import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import { Table, Card, Tag, Button, Input, Form, Modal, Row, Col, Select, Space } from 'antd';
import accountType from '../../constants/accountType';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import getPayloadToken from '../../helpers/utilities/getPayloadToken';

const { Option } = Select;
const ID_LENH_MUA = 2;
const ID_LENH_BAN = 1;

const ID_CHO_KHOP = 1;
const ID_DA_KHOP = 2;
const ID_DA_HUY = 3;

const STAFF_ACCOUNT = 'NV';
const TRADER_ACCOUNT = 'NDT';

const { typ } = getPayloadToken();

export default function TradingAcc(props) {
    const columns = [
        {
            key: 'trading_acc_id',
            dataIndex: 'trading_acc_id',
            title: 'Số hiệu TKGD',
            align: 'center',
            width: 100,
            render: tradingAcc => {
                return <NumberFormat value={tradingAcc} displayType="text" format="### ### ###"></NumberFormat>
            }
        },
        {
            key: 'amount',
            dataIndex: 'amount',
            title: 'Số dư',
            align: 'center',
            width: 200,
            render: amount => {
                return <NumberFormat value={amount} displayType="text" thousandSeparator suffix="VND"></NumberFormat>
            }
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái',
            align: 'center',
            width: 120,
            render: status => {
                if (status === true) {
                    return <Tag color="success">Đang hoạt động</Tag>;
                }
                else {
                    return <Tag color="error">Ngưng hoạt động</Tag>;
                }
            }
        },
        {
            key: 'user_name',
            dataIndex: 'user_name',
            title: 'Chủ sở hữu',
            align: 'center',
            width: 120,
        },
    ]
    const { tradingAcc, createTradingAccReq } = props;
    const [visible, setVisible] = useState(false);
    const [insertVisible, setInsertVisible] = useState(false);
    const [selectedTradingAcc, setSelectedTradingAcc] = useState({});
    const [pass, setPass] = useState();

    const handleAction = (record) => {
        setSelectedTradingAcc(record);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const handleOk = () => {

        setVisible(false);
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Quản trị tài khoản giao dịch</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Tài khoản giao dịch</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Quản trị TKGD </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                            <Space direction="vertical" style={{ width: '100%' }} >
                                                {
                                                    typ === TRADER_ACCOUNT ? (
                                                        <Button type="primary"
                                                            onClick={() => setInsertVisible(true)}
                                                        >Thêm TKGD</Button>
                                                    ) : ''
                                                }
                                                <Table
                                                    scroll={{ x: 240, y: 240 }}
                                                    pagination={false}
                                                    columns={columns}
                                                    dataSource={tradingAcc} />
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
                title="Cập nhật TKGD"
                visible={visible}
                width={800}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={handleCancel} >
                        Hủy bỏ
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk} >
                        Cập nhật
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 8 }}
                    layout="horizontal"
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item label="Số hiệu TKGD">
                                <NumberFormat
                                    customInput={Input}
                                    value={selectedTradingAcc.trading_acc_id}
                                    disabled
                                    displayType="input"
                                    format="### ### ###" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Số dư">
                                <NumberFormat
                                    customInput={Input}
                                    value={selectedTradingAcc.amount}
                                    disabled
                                    displayType="input"
                                    thousandSeparator
                                    suffix="VND"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Trạng thái">
                                <Select value={selectedTradingAcc.status}>
                                    <Option value={true} >Đang hoạt động</Option>
                                    <Option value={false} >Ngưng hoạt động</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                title="Thêm TKGD"
                visible={insertVisible}
                width={800}
                onCancel={() => setInsertVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setInsertVisible(false)} >
                        Hủy bỏ
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => {
                        createTradingAccReq({ pass });
                        setInsertVisible(false);
                    }}>
                        Thêm mới
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 6 }}
                    layout="horizontal"
                >
                    <Row justify="center" >
                        <Col span={12}>
                            <Form.Item label="Mật khẩu">
                                <Input.Password
                                    onChange={e => setPass(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}
