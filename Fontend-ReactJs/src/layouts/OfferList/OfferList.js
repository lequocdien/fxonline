import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Table, Card, Tag, Button, Input, Form, Modal, Row, Col, Select, Space } from 'antd';
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

export default function OfferList(props) {
    const columns = [
        {
            key: 'action',
            title: 'Hành động',
            align: 'center',
            width: 210,
            render: (text, record) => {
                return (
                    <Space>
                        <Button
                            type="primary"
                            shape="round"
                            size="small"
                            onClick={() => { setVisible(true); handleCapNhat(record) }}
                        >Cập nhật</Button>
                        <Button
                            hidden={typ === TRADER_ACCOUNT ? true : false}
                            disabled={record.status_order_id === ID_DA_KHOP || record.status_order_id === ID_DA_HUY ? true : false}
                            type="primary"
                            shape="round"
                            size="small"
                            danger
                            onClick={() => confirmMatchOrder(record)}
                        >Khớp lệnh</Button>
                    </Space>
                )
            }
        },
        {
            key: 'order_id',
            dataIndex: 'order_id',
            title: 'Mã lệnh',
            align: 'center',
            width: 100,
        },
        {
            key: 'status_order_name',
            dataIndex: 'status_order_name',
            title: 'Trạng thái lệnh',
            align: 'center',
            width: 100,
            render: (name, record) => {
                var res = null;
                if (record.status_order_id === ID_CHO_KHOP) {
                    res = <Tag color="#2db7f5">{name}</Tag>;
                }
                else if (record.status_order_id === ID_DA_KHOP) {
                    res = <Tag color="#87d068">{name}</Tag>;
                }
                else if (record.status_order_id === ID_DA_HUY) {
                    res = <Tag color="#f50">{name}</Tag>;
                }
                return res;
            }
        },
        {
            key: 'trading_acc_id',
            dataIndex: 'trading_acc_id',
            title: 'Số hiệu TKGD',
            align: 'center',
            width: 120,
            render: tradingAcc => {
                return <NumberFormat value={tradingAcc} displayType="text" format="### ### ###"></NumberFormat>
            }
        },
        {
            key: 'type_order_name',
            dataIndex: 'type_order_name',
            title: 'Loại lệnh',
            align: 'center',
            width: 90,
            render: (type_order, record) => {
                if (record.type_order_id === ID_LENH_MUA) {
                    return <Tag color="success">{type_order}</Tag>;
                }
                else if (record.type_order_id === ID_LENH_BAN) {
                    return <Tag color="error">{type_order}</Tag>;
                }
            }
        },
        {
            key: 'currency_rate_id',
            dataIndex: 'currency_rate_id',
            title: 'Tỷ giá',
            align: 'center',
            width: 100,
            render: (currency_rate_id, record) => {
                return `${record.MaDongTienYetGia}/${record.MaDongTienDinhGia}`;
            }
        },
        {
            key: 'quantity',
            dataIndex: 'quantity',
            title: 'Khối lượng',
            align: 'center',
            width: 120,
            render: quantity => {
                return <NumberFormat value={quantity} thousandSeparator displayType="text" />
            }
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Giá',
            align: 'center',
            width: 150,
            render: price => {
                return <NumberFormat value={price} suffix="VND" thousandSeparator displayType="text" />
            }
        },
        {
            key: 'tennguoidat',
            dataIndex: 'TenTKNDTDat',
            title: 'Người đặt',
            align: 'center',
            width: 150,
            render: (TenTKNDTDat, record) => {
                return TenTKNDTDat || record.TenTKNVDat;
            }
        },
        {
            key: 'nvkhop',
            dataIndex: 'TenTKNVKhop',
            title: 'Người khớp',
            align: 'center',
            width: 150,
            render: nvkhop => {
                return nvkhop ? nvkhop : '...';
            }
        },
        {
            key: 'tgdat',
            dataIndex: 'TGDat',
            title: 'Thời gian đặt lệnh',
            align: 'center',
            width: 180,
            render: date => {
                return Moment(date).format('DD/MM/YYYY hh:mm:ss');
            }
        },
        {
            key: 'tgkhop',
            dataIndex: 'TGKhop',
            title: 'Thời gian khớp lệnh',
            align: 'center',
            width: 180,
            render: date => {
                return date ? Moment(date).format('DD/MM/YYYY hh:mm:ss') : '...';
            }
        },
    ]
    const { offer, tradingAcc, currencyRate, typeOrder, statusOrder, fetchTradingAccReq, updateOfferReq } = props;
    const [visible, setVisible] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState({});
    const [statusOrderId, setStatusOrderId] = useState();

    const confirmMatchOrder = (record) => {
        Modal.confirm({
            title: 'Xác nhận khớp lệnh.',
            content: `Bạn có chắc chắn khớp lệnh có mã lệnh là ${record.order_id}`,
            okText: 'Khớp lệnh',
            cancelText: 'Hủy bỏ',
            onOk: () => {
                updateOfferReq({ ...record, status_order_id: ID_DA_KHOP });
            }
        })
    }

    const handleCapNhat = (record) => {
        fetchTradingAccReq({ username: record.TenTKNDTDat || record.TenTKNVDat })
        setSelectedOffer(record);
        setStatusOrderId(record.status_order_id);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const handleOk = () => {
        setVisible(false);
        updateOfferReq(selectedOffer);
    }

    const onTradingAccChange = val => {
        setSelectedOffer({ ...selectedOffer, trading_acc_id: val });
    }

    const onCurrencyRateChange = val => {
        setSelectedOffer({ ...selectedOffer, currency_rate_id: val });
    }

    const onOfferTypeChange = val => {
        setSelectedOffer({ ...selectedOffer, type_order_id: val });
    }

    const onStatusChange = val => {
        setSelectedOffer({ ...selectedOffer, status_order_id: val });
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Quản lý trạng thái lệnh</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Lệnh giao dịch</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Quản lý trạng thái lệnh </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                            <Table
                                                scroll={{ x: 240, y: 240 }}
                                                pagination={false}
                                                columns={columns}
                                                dataSource={offer} />
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
                title="Cập nhật trạng thái lệnh"
                visible={visible}
                width={800}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={handleCancel} >
                        Hủy bỏ
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={statusOrderId === ID_DA_KHOP ? true : false}
                        onClick={() => handleOk()} >
                        Cập nhật
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 9 }}
                    layout="horizontal"
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item label="Số hiệu tài khoản">
                                <Select
                                    value={selectedOffer.trading_acc_id}
                                    disabled={statusOrderId === ID_DA_KHOP || statusOrderId === ID_DA_HUY ? true : false}
                                    onChange={onTradingAccChange}
                                >
                                    {
                                        _.map(tradingAcc, o => {
                                            return (
                                                <Option key={o.trading_acc_id} value={o.trading_acc_id}>
                                                    <NumberFormat value={o.trading_acc_id} displayType="text" format="### ### ###" />
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tỷ giá">
                                <Select
                                    value={selectedOffer.currency_rate_id}
                                    disabled={statusOrderId === ID_DA_KHOP || statusOrderId === ID_DA_HUY ? true : false}
                                    onChange={onCurrencyRateChange}
                                >
                                    {
                                        _.map(currencyRate, o => {
                                            return (
                                                <Option key={o.currency_rate_id} value={o.currency_rate_id}>{o.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Khối lượng">
                                <NumberFormat
                                    customInput={Input}
                                    value={selectedOffer.quantity}
                                    disabled={statusOrderId === ID_DA_KHOP || statusOrderId === ID_DA_HUY ? true : false}
                                    thousandSeparator
                                    onValueChange={(val) => setSelectedOffer({ ...selectedOffer, quantity: val.floatValue })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Loại lệnh">
                                <Select
                                    value={selectedOffer.type_order_id}
                                    disabled={statusOrderId === ID_DA_KHOP || statusOrderId === ID_DA_HUY ? true : false}
                                    onChange={onOfferTypeChange}
                                >
                                    {
                                        _.map(typeOrder, o => {
                                            return (
                                                <Option key={o.type_order_id} value={o.type_order_id}>{o.type_order_name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Giá">
                                <NumberFormat
                                    customInput={Input}
                                    value={selectedOffer.price}
                                    disabled={statusOrderId === ID_DA_KHOP || statusOrderId === ID_DA_HUY ? true : false}
                                    thousandSeparator suffix="VND"
                                    onValueChange={(val) => setSelectedOffer({ ...selectedOffer, price: val.floatValue })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Trạng thái">
                                <Select
                                    value={selectedOffer.status_order_id}
                                    disabled={statusOrderId === ID_DA_KHOP || statusOrderId === ID_DA_HUY ? true : false}
                                    onChange={onStatusChange} >
                                    {
                                        _.map(statusOrder, o => {
                                            return (
                                                <Option
                                                    key={o.status_order_id}
                                                    value={o.status_order_id}
                                                    // disabled={o.status_order_id === ID_DA_KHOP ? true : false}
                                                    style={{ display: o.status_order_id === ID_DA_KHOP ? 'none' : 'inherit' }}
                                                >{o.status_order_name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Người đặt">
                                <Input value={selectedOffer.TenTKNDTDat || selectedOffer.TenTKNVDat} disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Thời gian đặt lệnh">
                                <Input
                                    value={Moment(selectedOffer.TGDat || Moment.utc()).format('DD/MM/YYYY hh:mm:ss')}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Người khớp">
                                <Input value={selectedOffer.TenTKNVKhop || '...'} disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Thời gian khớp lệnh">
                                <Input
                                    value={selectedOffer.TGKhop ? Moment(selectedOffer.TGKhop).format('DD/MM/YYYY hh:mm:ss') : ''}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Ghi chú">
                                <Input
                                    value={selectedOffer.description}
                                    disabled={statusOrderId === ID_DA_KHOP || statusOrderId === ID_DA_HUY ? true : false}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}
