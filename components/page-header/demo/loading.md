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
import { PageHeader } from 'antd';

ReactDOM.render(
  <PageHeader
    loading
    title="Title"
    subTitle="This is a subtitle"
  />,
  mountNode
);

```
