
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Alert, Table, Icon, Divider, Button } from 'antd';
import { connect } from 'react-redux'
import './index.less';
import { get_list } from '../../../../redux/actions/college'
class CollegeList extends React.Component {
    columns = [{
        title: '序号',
        dataIndex: 'cid',
        key: 'cid',
        width: 120
    }, {
        title: '学校名',
        dataIndex: 'cname',
        key: 'cname',
        width: 150
    },{
        title: '创建时间',
        dataIndex: 'c_c',
        key: 'c_c',
        width: 180
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                {record['c_d'] == 0 ? (<a href="#" style={{ color: '#F00' }}>禁用</a>) : (<a href="#" style={{ color: '#50B233' }}>启用</a>)}
                <Divider type="vertical" />
                <a href="#" >删除</a>
                <Divider type="vertical" />
                <a href="#">修改</a>
            </span>
        ),
    }];
    componentWillMount() {

        this.props.dispatch(get_list())
    }
    render() {

        const { list, loading } = this.props.memory;
        return (
            <div className="list">
                <Alert
                    message="注意事项"
                    description={(
                        <div>
                            <div>1.分组名不能重复</div>
                            <div>2.数据删除就无法恢复，建议使用禁用</div>
                        </div>
                    )}
                    type="info"
                    showIcon
                />
                <div className="table-btns">
                    <Button type="primary">添加</Button>
                    <Button type="primary">禁用</Button>
                    <Button type="primary">删除</Button>
                </div>
                <Table columns={this.columns} dataSource={list} bordered style={{ marginTop: 10 }} loading={loading} rowSelection={{
                    fixed: true
                }} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.college
}
export default connect(mapStateToProps)(CollegeList)