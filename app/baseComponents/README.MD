# Grid网格组件

## 属性
| 属性  | 数据类型 | 说明
|------|:--------|:-----:|
| column | `number` | 列数 默认 2
| gridLine | `bool` | 是否显示网络线 默认 `true`
| gridData | `Array`| 网络中要渲染的内容,
| scroll | `bool` | 是否滚动 默认 `false`
| cellHeight | `number` | 单元格高度, 如果未指定 则 cellHeight = 网络的高度 / ceil(gridData.length / column)

```js
import Grid from '../baseComponents/Grid';
...
render() {
  <Grid column={2} gridLine={true}  gridData={this.state.buttons} scroll={false}/>
}
```

# DataGrid数据网格组件

| 属性  | 数据类型 | 说明
|------|:--------|:-----:|
| columns | `Column` | 列属性,包括列标题和数据源的key,必要
| source | `Array of Json` | 数据源,必要
| rowHeight | `number`| 行高
| batchCount | `number`| 每次渲染的行数, 默认为4

```js
import {DataGrid, Column} from '../baseComponents/DataGrid';
...
render() {
    let columnConfig = [
      new Column('姓名', 'sName'),
      new Column('电话', 'sPhone'),
      new Column('是否投资', 'bInvested', data => {return data ? '是': '否'}),
      new Column('生日日期', 'dBirthday')
    ];
    return (
      <View>
        <DataGrid columns={columnConfig} source={this.props.cells}/>
      </View>
    );
  }
```
