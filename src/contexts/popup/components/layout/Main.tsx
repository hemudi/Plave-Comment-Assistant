import { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => (
  <main className="flex items-center w-full min-h-30">{children}</main>
);

export default Main;
