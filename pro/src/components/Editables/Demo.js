import { Input,Select,Form } from 'antd';
import React from 'react';
import EditableTable from './index';

class Demo extends React.Component {
    get columns(){
        return [
            {
                title: 'name',
                dataIndex: 'name',
                width: '30%',
                editable: true,
                editType: 'select',
              },
              {
                title: 'age',
                dataIndex: 'age',
                editable: true
              },
              {
                title: 'age',
                dataIndex: 'age',
                editable: false
              },
        ]
    }
    render() {
        return (
            <EditableTable customColumns={this.columns} />
        )
    }
}
export default Demo;