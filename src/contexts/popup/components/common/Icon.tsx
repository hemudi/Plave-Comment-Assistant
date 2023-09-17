import { MemberName } from '@constants/member';

const Icon = ({ type }: { type: (typeof MemberName)[number] }) => (
  <img className="w-4 h-4 rounded-full" src={`assets/icons/symbol/ic_${type.toLowerCase()}.png`} alt="icon" />
);

export default Icon;
