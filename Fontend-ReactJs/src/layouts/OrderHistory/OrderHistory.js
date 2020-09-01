import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Table, Card, Tag, Button, Input, Form, Modal, Row, Col, Select, Space, Empty } from 'antd';
import getPayloadToken from '../../helpers/utilities/getPayloadToken';

const { Option } = Select;
const ID_LENH_MUA = 2;
const ID_LENH_BAN = 1;
const ID_CHO_KHOP = 1;
const ID_DA_KHOP = 2;
const ID_DA_HUY = 3;

export default function OrderHistory(props) {
    const columns = [
        {
            key: 'order_id',
            dataIndex: 'order_id',
            title: 'Mã lệnh',
            align: 'center',
            width: 100,
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Diễn dãi',
            align: 'center',
            width: 250,
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
            key: 'tennguoithuchien',
            dataIndex: 'TenTKNDTThucHien',
            title: 'Người thực hiện',
            align: 'center',
            width: 150,
            render: (TenTKNDTThucHien, record) => {
                return record.TenTKNDTThucHien || record.TenTKNVThucHien;
            }
        },
        {
            key: 'tgthuchien',
            dataIndex: 'TGThucHien',
            title: 'Thời gian thực hiện',
            align: 'center',
            width: 180,
            render: date => {
                return Moment(date).format('DD/MM/YYYY hh:mm:ss');
            }
        },
    ]
    const { offers, offerHistory, fetchOfferHistroyReq } = props;
    const [orderId, setOrderId] = useState(-1);

    useEffect(() => {
        fetchOfferHistroyReq({ order_id: orderId });
    }, [orderId])

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Tra cứu lịch sử lệnh</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Lệnh giao dịch</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Tra cứu lịch sử lệnh </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                            <Space direction="vertical" style={{ width: '100%' }} >
                                                <Row justify="center" >
                                                    <Col span={8}>
                                                        <Form.Item label="Mã lệnh">
                                                            <Select
                                                                showSearch
                                                                value={orderId}
                                                                onChange={val => setOrderId(val)}
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) =>
                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                <Option value={-1}>-- - ----</Option>
                                                                {
                                                                    _.map(offers, o => {
                                                                        return (
                                                                            <Option key={o.order_id} value={o.order_id}>
                                                                                {`${o.order_id} - ${o.status_order_name}`}
                                                                            </Option>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                {
                                                    offerHistory.length === 0 ? (
                                                        <Empty
                                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                            imageStyle={{
                                                                height: 60,
                                                            }}
                                                            description={
                                                                <span>
                                                                    Bạn vui lòng chọn mã lệnh
                                                            </span>
                                                            }
                                                        >
                                                        </Empty>
                                                    ) : (
                                                            <Table
                                                                scroll={{ x: 240, y: 240 }}
                                                                pagination={false}
                                                                columns={columns}
                                                                dataSource={offerHistory} />
                                                        )
                                                }
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
        </div>
    );
}
