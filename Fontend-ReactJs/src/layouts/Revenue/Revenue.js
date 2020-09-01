import React from 'react';
import _ from 'lodash';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import accountType from '../../constants/accountType';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Table, Card, Select, Typography, Row, Col, Empty } from 'antd';

const { Option } = Select;
const ID_LENH_MUA = 2;
const ID_LENH_BAN = 1;

const ID_CHO_KHOP = 1;
const ID_DA_KHOP = 2;
const ID_DA_HUY = 3;

export default function AssetInfo(props) {
    const columns = [
        {
            key: 'thu',
            dataIndex: 'Thu',
            title: 'Thứ',
            align: 'center',
            width: 40,
            render: thu => {
                return thu === 8 ? 'Chủ nhật' : `Thứ ${thu}`;
            }
        },
        {
            key: 'Ngay',
            dataIndex: 'Ngay',
            title: 'Ngày',
            align: 'center',
            width: 80,
            render: ngay => {
                return `${Moment(ngay).format("DD/MM/YYYY")}`;
            }
        },
        {
            key: 'TenLoaiLenh',
            dataIndex: 'TenLoaiLenh',
            title: 'Tên loại lệnh',
            align: 'center',
            width: 80,
        },
        {
            key: 'TongSoLenh',
            dataIndex: 'TongSoLenh',
            title: 'Tổng số lệnh',
            align: 'center',
            width: 120,
        },
        {
            key: 'TongTien',
            dataIndex: 'TongTien',
            title: 'Tổng tiền',
            align: 'center',
            width: 120,
            render: price => {
                return <NumberFormat value={price} suffix="VND" thousandSeparator displayType="text" />
            }
        },
    ]
    const { revenues } = props;
    console.log(revenues)
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Báo cáo doanh thu</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Báo cáo</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Báo cáo doanh thu </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                            {
                                                revenues.length === 0 ? (
                                                    <Empty
                                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                        imageStyle={{
                                                            height: 60,
                                                        }}
                                                        description={
                                                            <span>
                                                                Không có dữ liệu.
                                                        </span>
                                                        }
                                                    >
                                                    </Empty>
                                                ) : (
                                                        <React.Fragment>
                                                            <Row justify="center" >
                                                                <Col>
                                                                    <Typography.Title level={2}>BÁO CÁO DOANH THU</Typography.Title>
                                                                </Col>

                                                            </Row>
                                                            <Row justify="center" >
                                                                <Col>
                                                                    <Typography.Title level={4}>{`Tháng ${Moment(revenues[0].ThoiGian).month() + 1}-${Moment(revenues[0].ThoiGian).year()}`}</Typography.Title>
                                                                </Col>
                                                            </Row>
                                                            <Table
                                                                scroll={{ x: 240, y: 240 }}
                                                                pagination={false}
                                                                columns={columns}
                                                                dataSource={revenues}
                                                                summary={
                                                                    data => {
                                                                        let tongSoLenhBan = 0;
                                                                        let tongSoLenhMua = 0;
                                                                        let tongTienBan = 0;
                                                                        let tongTienMua = 0;

                                                                        data.forEach(({ MaLoaiLenh, TongSoLenh, TongTien }) => {
                                                                            if (MaLoaiLenh === ID_LENH_BAN) {
                                                                                tongSoLenhBan = tongSoLenhBan + parseInt(TongSoLenh);
                                                                                tongTienBan = tongTienBan + parseFloat(TongTien);
                                                                            }
                                                                            else if (MaLoaiLenh === ID_LENH_MUA) {
                                                                                tongSoLenhMua = tongSoLenhMua + parseInt(TongSoLenh);
                                                                                tongTienMua = tongTienMua + parseFloat(TongTien);
                                                                            }
                                                                        })

                                                                        return (
                                                                            <>
                                                                                <Table.Summary.Row style={{ textAlign: 'center', color: "#87d068", background: "#fafafa", fontWeight: "bold" }} >
                                                                                    <Table.Summary.Cell colSpan={3}>Lệnh mua</Table.Summary.Cell>
                                                                                    <Table.Summary.Cell>{tongSoLenhMua}</Table.Summary.Cell>
                                                                                    <Table.Summary.Cell>
                                                                                        <NumberFormat
                                                                                            displayType="text"
                                                                                            value={tongTienMua}
                                                                                            thousandSeparator
                                                                                            suffix="VND"
                                                                                        />
                                                                                    </Table.Summary.Cell>
                                                                                </Table.Summary.Row>
                                                                                <Table.Summary.Row style={{ textAlign: 'center', color: "#f50", background: "#fafafa", fontWeight: "bold" }}>
                                                                                    <Table.Summary.Cell colSpan={3}>Lệnh bán</Table.Summary.Cell>
                                                                                    <Table.Summary.Cell>{tongSoLenhBan}</Table.Summary.Cell>
                                                                                    <Table.Summary.Cell>
                                                                                        <NumberFormat
                                                                                            displayType="text"
                                                                                            value={tongTienBan}
                                                                                            thousandSeparator
                                                                                            suffix="VND"
                                                                                        />
                                                                                    </Table.Summary.Cell>
                                                                                </Table.Summary.Row>
                                                                            </>
                                                                        );
                                                                    }
                                                                }
                                                            />
                                                        </React.Fragment>
                                                    )
                                            }
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
