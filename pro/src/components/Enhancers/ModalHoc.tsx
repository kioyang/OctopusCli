import React from 'react';
import { Modal } from 'antd';

interface IProps {
    content: React.ReactNode;//内容
    title: React.ReactNode; // 模态框标题
    onOk: Function;
}

class ModalHoc extends React.Component<IProps> {
    state = { visible: false };
    render() {
        const { content, title, children, onOk } = this.props;
        return (
            <>
                <Modal
                    width={1000}
                    bodyStyle={{}}
                    centered
                    visible={this.state.visible}
                    title={title}
                    onOk={() => {
                        onOk();
                        this.setState({
                            visible: false,
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                >
                    {content}
                </Modal>
                <span onClick={() => {
                    this.setState({
                        visible: true,
                    })
                }}>
                    {children}
                </span>
            </>
        );
    }
}

export default ModalHoc;