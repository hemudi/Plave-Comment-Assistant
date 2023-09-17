import { ReactNode } from 'react';
import Header from '@contexts/popup/components/layout/Header';
import Main from '@contexts/popup/components/layout/Main';
import Footer from '@contexts/popup/components/layout/Footer';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col justify-center items-center w-128 p-3 gap-3 font-LINESeedKR font-normal select-none">
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
);

export default Layout;
