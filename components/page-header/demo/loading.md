---
order: 5
title:
  zh-CN: 骨架屏
  en-US: Skeleton
---

## zh-CN

如果使用了需要异步请求的数据，可以先展示骨架屏，数据加载完成后在显示。

## en-US

If you are using data that requires an asynchronous request, you can first display the skeleton screen and display it when the data is loaded.

```jsx
import { PageHeader, Switch } from 'antd';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

class PageHeaderLoading extends React.Component {
  state = {
    loading: true,
  };
  
  changeLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Switch checked={loading} onChange={this.changeLoading} /> Swith Loading
        <br />
        <br />
        <PageHeader
          loading={loading}
          title='Title'
          onBack={() => null}
          subTitle='This is a subtitle'
        />
        <br />
        <PageHeader
          loading={loading}
          title='Title'
          breadcrumb={{ routes }}
          subTitle='This is a subtitle'
        />
        <br />
        <PageHeader
          loading={loading}
          title='Title'
          breadcrumb={{ routes }}
          subTitle='This is a subtitle'
        >
          The header can be used to declare the page topic, display important
          information about the page that the user is interested in, and carry
          the action items related to the current page (including page-level
          operations, inter-page navigation, etc.)
        </PageHeader>
      </div>
    );
  }
}

ReactDOM.render(<PageHeaderLoading />, mountNode);

```
