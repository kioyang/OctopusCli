import { divide } from 'lodash';
import React from 'react';
import { TreeSelect } from 'antd';

// /portal/rs/component?event=dicTree&dicCode=pzfl100101
class TreeSelectField extends React.Component {

    state = {
        value: undefined,
        treeData: []
      };
    
      onChange = value => {
        console.log(value);
        this.setState({ value });
      };

      componentDidMount() {
          this.fetchUser();
      }

      loopTree = (arr = []) => {
          let result = [];
        for(let i =0, len = arr.length; i < len; i++) {
            const item = arr[i];
            item.key = item.id;
            if(item.children && item.children.length) {
                return this.loopTree(item);
            }
            result =  item;
        }
      }

      fetchUser = value => {
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });
        fetch('/portal/rs/component?event=dicTree&dicCode=pzfl100101')
          .then(response => response.json())
          .then(body => {
              const list = body.content && body.content.list;
              const gtree = this.loopTree(list);
            this.setState({ treeData: list, fetching: false });
          });
      };
    
      render() {
        return (
          <TreeSelect
            style={{ width: '100%' }}
            value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={this.state.treeData}
            placeholder="请选择商品类别"
            treeDefaultExpandAll
            onChange={this.onChange}
          />
        );
      }
    
}

export default TreeSelectField;