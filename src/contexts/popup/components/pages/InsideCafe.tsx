import { ReactNode } from 'react';

const InsideCafe = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col justify-center items-center w-full h-fit min-h-full">{children}</div>
);

export default InsideCafe;
