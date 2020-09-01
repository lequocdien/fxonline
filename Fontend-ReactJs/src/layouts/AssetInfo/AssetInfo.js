import React from 'react';
import _ from 'lodash';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import accountType from '../../constants/accountType';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Table, Card, Select } from 'antd';

const { Option } = Select;
const ID_LENH_MUA = 2;
const ID_LENH_BAN = 1;

const ID_CHO_KHOP = 1;
const ID_DA_KHOP = 2;
const ID_DA_HUY = 3;

export default function AssetInfo(props) {
    const columns = [
        {
            key: 'tentygia',
            dataIndex: 'TenTyGia',
            title: 'Tỷ giá',
            align: 'center',
            width: 120,
        },
        {
            key: 'khoiluong',
            dataIndex: 'KhoiLuong',
            title: 'Khối lượng',
            align: 'center',
            width: 120,
            render: khoiluong => {
                return <NumberFormat value={khoiluong} thousandSeparator displayType="text" />
            }
        },
        {
            key: 'tentkchusohuu',
            dataIndex: 'TenTKChuSoHuu',
            title: 'Chủ sở hữu',
            align: 'center',
            width: 120,
        },
    ]
    const { assets } = props;

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Thông tin tài sản tỷ giá</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Thông tin cá nhân</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Thông tin tài sản </li>
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
                                                dataSource={assets}
                                            />
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
