import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Table, Card, Tag, Button, Input, Form, Modal, Row, Col, Select, Space, Empty } from 'antd';

const { Option } = Select;
const ID_LENH_MUA = 2;
const ID_LENH_BAN = 1;
const ID_CHO_KHOP = 1;
const ID_DA_KHOP = 2;
const ID_DA_HUY = 3;

export default function TradingAccHistory(props) {
    const columns = [
        {
            key: 'MaTKGD',
            dataIndex: 'MaTKGD',
            title: 'Ma TKGD',
            align: 'center',
            width: 120,
            render: matkgd => {
                return <NumberFormat
                    value={matkgd}
                    format="### ### ###"
                    displayType="text"
                />
            }
        },
        {
            key: 'diendai',
            dataIndex: 'LyDo',
            title: 'Diễn dãi',
            align: 'center',
            width: 250,
        },
        {
            key: 'loaibiendong',
            dataIndex: 'LoaiBienDong',
            title: 'Loại biến động',
            align: 'center',
            width: 100,
            render: loaibiendong => {
                return loaibiendong ? <Tag color="#87d068">Nạp tiền</Tag> : <Tag color="#f50">Rút tiền</Tag>
            }
        },
        {
            key: 'SoTienBienDong',
            dataIndex: 'SoTienBienDong',
            title: 'Số tiền',
            align: 'center',
            width: 150,
            render: sotien => {
                return <NumberFormat value={sotien} suffix="VND" thousandSeparator displayType="text" />
            }
        },
        {
            key: 'NguoiThucHien',
            dataIndex: 'NguoiThucHien',
            title: 'Người thực hiện',
            align: 'center',
            width: 120
        },
        {
            key: 'SoTKNH',
            dataIndex: 'SoTKNH',
            title: 'Số TK ngân hàng',
            align: 'center',
            width: 250
        },
        {
            key: 'TenChuThe',
            dataIndex: 'TenChuThe',
            title: 'Tên chủ thẻ',
            align: 'center',
            width: 250
        },
        {
            key: 'TenNganHang',
            dataIndex: 'TenNganHang',
            title: 'Tên ngân hàng',
            align: 'center',
            width: 200
        },
        {
            key: 'TenChiNhanh',
            dataIndex: 'TenChiNhanh',
            title: 'Tên chi nhánh',
            align: 'center',
            width: 250
        },
        {
            key: 'ThoiGian',
            dataIndex: 'ThoiGian',
            title: 'Thời gian thực hiện',
            align: 'center',
            width: 180,
            render: date => {
                return Moment(date).format('DD/MM/YYYY hh:mm:ss');
            }
        },
    ]
    const { tradingAcc, tradingAccHistory, fetchTradingAccHistoryReq } = props;
    const [tradingAccId, setTradingAccId] = useState(-1);

    useEffect(() => {
        fetchTradingAccHistoryReq({ trading_acc_id: tradingAccId });
    }, [tradingAccId])

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Tra cứu lịch nạp/rút tiền</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Tài khoản giao dịch</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Tra cứu lịch sử nạp/rút tiền </li>
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
                                                        <Form.Item label="Số hiệu TKGD">
                                                            <Select
                                                                showSearch
                                                                value={tradingAccId}
                                                                onChange={val => setTradingAccId(val)}
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) =>
                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                <Option value={-1}>---------</Option>
                                                                {
                                                                    _.map(tradingAcc, o => {
                                                                        return (
                                                                            <Option key={o.trading_acc_id} value={o.trading_acc_id}>
                                                                                <NumberFormat
                                                                                    value={o.trading_acc_id}
                                                                                    format="### ### ###"
                                                                                    displayType="text"
                                                                                />
                                                                            </Option>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                {
                                                    tradingAccHistory.length === 0 ? (
                                                        <Empty
                                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                            imageStyle={{
                                                                height: 60,
                                                            }}
                                                            description={
                                                                <span>
                                                                    Bạn vui lòng chọn số hiệu TKGD
                                                            </span>
                                                            }
                                                        >
                                                        </Empty>
                                                    ) : (
                                                            <Table
                                                                scroll={{ x: 240, y: 240 }}
                                                                pagination={false}
                                                                columns={columns}
                                                                dataSource={tradingAccHistory} />
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
