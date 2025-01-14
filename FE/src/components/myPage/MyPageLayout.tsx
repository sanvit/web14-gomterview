import Layout from '@/components/layout/Layout';
import { css } from '@emotion/react';
import MyPageHeader from '@components/myPage/MyPageHeader';
import Logo from '@common/Logo/Logo';

type MyPageLayoutProps = {
  children: React.ReactNode;
};

const MyPageLayout: React.FC<MyPageLayoutProps> = ({ children }) => {
  return (
    <div>
      <div
        css={css`
          padding: 1.5rem;
        `}
      >
        <Logo />
      </div>
      <Layout
        direction="column"
        css={css`
          height: auto;
          padding: 1rem 0;
          row-gap: 1.5rem;
        `}
      >
        <MyPageHeader />
        {children}
      </Layout>
    </div>
  );
};

export default MyPageLayout;
