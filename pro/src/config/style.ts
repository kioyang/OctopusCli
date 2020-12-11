// 自适应临界点
export enum Breakpoint {
    xs = 480,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1600
}

export enum GlobalStyle {
    tight = 'tight', // 紧凑
    normal = 'normal',// 正常
    loose = 'loose', // 疏松
}

export enum GlobalDensity {
    veryLoose = 24,
    loose = 12,
    normal = 8,
    tight = 4,
    veryTight = 1
}

export const DensityStyleMap = {
    [GlobalDensity.veryLoose]: { gap: 60 },
    [GlobalDensity.loose]: { gap: 50 },
    [GlobalDensity.normal]: { gap: 46},
    [GlobalDensity.tight]: { gap: 38 },
    [GlobalDensity.veryTight]: { gap: 32 },
}



export const defaultStyle = GlobalStyle.tight;

// 块 Block
export const BlockStyleMap = {
    [GlobalStyle.tight]: { padding:4,boxSizing: 'border-box',MozBoxSizing: 'border-box',WebkitBoxSizing: 'border-box'},
    [GlobalStyle.normal]: {padding:16,boxSizing: 'border-box',MozBoxSizing: 'border-box',WebkitBoxSizing: 'border-box' },
    [GlobalStyle.loose]: {padding:24,boxSizing: 'border-box',MozBoxSizing: 'border-box',WebkitBoxSizing: 'border-box'}
}

// 表单自适应
/**
 * 表单相加是24 * rows
 */

 function spanByNameAndOffset(origin,name,offset = 0) {
    return {
        xxl: { span:origin + offset},
        xl: { span: origin + offset},
        lg: { span: 8},
        sm: { span: 24 },
        xs: { span: 24 },
    }
 }
export const FormResponsive = {
    generate: function({ width = 1000,rows, fields}:any) {
        const size = rows; // 每列显示
        const origin = 24 / size;
        // const keys = Object.keys(fields) || [];
        // const count = keys.length; // 总字段数
        const responsives = {};
        let firstResponsive = null;
        let count = 0;
        for(let x in fields) {
            const item = fields[x];
            const { name,offset } = item;
            let responsive = spanByNameAndOffset(origin,name,offset || 0);
            if(!firstResponsive) {
                firstResponsive = responsive;
            }
            if(count === 4) {
                responsive = firstResponsive;
            }
            responsives[x] = responsive;
            count++;

        }
        console.log(responsives)
        return {
            ...responsives,
            responsive: firstResponsive,
            formItemLayout: { // 表单项自适应
                labelCol: {
                    xxl: { span: 8 },
                    xl: { span: 8 },
                    lg: { span: 12 },
                },
                wrapperCol: {
                    xxl: { span: 16 },
                    xl: { span: 16 },
                    lg: { span: 12 },
                },
            }
        }
    }
}