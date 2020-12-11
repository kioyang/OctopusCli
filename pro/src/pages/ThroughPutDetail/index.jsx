import React from 'react';
import FP from './fp';
import ResponsivePage from '@/components/ResponsivePage';
import ResponsiveBlock from '@/components/ResponsiveBlock';

class ThroughPutDetail extends React.Component {

    componentDidMount() {
        FP((data) => {
            console.log(data);
            const urldata = data[1] || {};
            const { reporturl } = urldata.content;
            this.report.src = reporturl;
        });
    }
    render() {
        return (
            <ResponsivePage style={{margin:0,padding:0,marginTop:4}}>
                <ResponsiveBlock style={{margin:4,padding:0,marginBottom:0,marginTop:0}}>
                    <iframe
                    style={{ background: '#fff',
                    padding: 0,
                    width: '100%',
                    height: '99%',
                    border: 'none'
                    }}
                    ref={(el) => { this.report = el; }}
                    />
                </ResponsiveBlock>
            </ResponsivePage>)
    }
}
export default ThroughPutDetail;