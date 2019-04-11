import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import classnames from 'classnames';
import { BreadcrumbProps } from '../breadcrumb';
import Divider from '../divider';
import Breadcrumb from '../breadcrumb';
import Tag from '../tag';
import Wave from '../_util/wave';
import Skeleton from '../skeleton';

export interface PageHeaderProps {
  loading?: boolean;
  backIcon?: React.ReactNode;
  prefixCls?: string;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  breadcrumb?: BreadcrumbProps;
  tags?: Tag[];
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  onBack?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

const renderBack = (prefixCls: string, props: PageHeaderProps) => {
  const { backIcon, onBack, loading } = props;
  if (!backIcon || !onBack) {
    return null;
  }
  return (
    <div
      className={`${prefixCls}-back-icon`}
      onClick={e => {
        if (onBack) {
          onBack(e);
        }
      }}
    >
      <Skeleton
        loading={loading}
        active
        paragraph={false}
        title={{
          width: 22,
          style: {
            display: 'inline-block',
          },
        }}
      >
        <Wave>{backIcon}</Wave>
        <Divider type="vertical" />
      </Skeleton>
    </div>
  );
};

const renderBreadcrumb = (
  breadcrumb: BreadcrumbProps,
  prefixCls: string,
  props: PageHeaderProps,
) => {
  const { loading } = props;
  if (loading && breadcrumb.routes) {
    return (
      <div className={`${prefixCls}-breadcrumb`}>
        {breadcrumb.routes.map(() => (
          <Skeleton loading={loading} active paragraph={false} />
        ))}
      </div>
    );
  }
  return <Breadcrumb {...breadcrumb} />;
};

const renderHeader = (prefixCls: string, props: PageHeaderProps) => {
  const { breadcrumb } = props;
  if (breadcrumb && breadcrumb.routes && breadcrumb.routes.length >= 2) {
    return renderBreadcrumb(breadcrumb, prefixCls, props);
  }
  return renderBack(prefixCls, props);
};

const renderTitle = (prefixCls: string, props: PageHeaderProps) => {
  const { title, subTitle, tags, extra, loading } = props;
  const titlePrefixCls = `${prefixCls}-title-view`;
  if (title || subTitle || tags || extra) {
    return (
      <div className={`${prefixCls}-title-view`}>
        <Skeleton
          loading={loading}
          active
          paragraph={false}
          title={{
            style: {
              minWidth: '400px',
              display: 'inline-block',
            },
          }}
        >
          <span className={`${titlePrefixCls}-title`}>{title}</span>
          {subTitle && <span className={`${titlePrefixCls}-sub-title`}>{subTitle}</span>}
          {tags && <span className={`${titlePrefixCls}-tags`}>{tags}</span>}
          {extra && <span className={`${titlePrefixCls}-extra`}>{extra}</span>}
        </Skeleton>
      </div>
    );
  }
  return null;
};

const renderFooter = (prefixCls: string, footer: React.ReactNode) => {
  if (footer) {
    return <div className={`${prefixCls}-footer`}>{footer}</div>;
  }
  return null;
};

const renderChildren = (prefixCls: string, props: React.PropsWithChildren<PageHeaderProps>) => {
  const { loading, children } = props;
  if (!children) {
    return null;
  }
  if (loading) {
    return <Skeleton loading={loading} active paragraph={{ rows: 2 }} title={false} />;
  }
  return <div className={`${prefixCls}-content-view`}>{children}</div>;
};

const PageHeader: React.SFC<PageHeaderProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, style, footer, className: customizeClassName } = props;

      const prefixCls = getPrefixCls('page-header', customizePrefixCls);
      const className = classnames(
        prefixCls,
        {
          [`${prefixCls}-has-footer`]: footer,
        },
        customizeClassName,
      );

      return (
        <div className={className} style={style}>
          {renderHeader(prefixCls, props)}
          {renderTitle(prefixCls, props)}
          {renderChildren(prefixCls, props)}
          {renderFooter(prefixCls, footer)}
        </div>
      );
    }}
  </ConfigConsumer>
);

PageHeader.defaultProps = {
  backIcon: <Icon type="arrow-left" />,
};

export default PageHeader;
