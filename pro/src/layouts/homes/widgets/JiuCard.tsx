import React from 'react';


interface IProps {
    pic: string; // 图片
    title: any; // 标题
    style:any;
}

interface IJiuCard {
    showUp: Function; // 出现的效果
}

class JiuCard extends React.Component<IProps> implements IJiuCard {

    showUp = () => {

    }

    render() {
        const { title,pic,style = {} } = this.props;
        return (
            <div style={{width: '100%',...style}}>
                <img style={{width:'100%'}} src={pic} title={title} />
            </div>
        )
    }
}
export default JiuCard;