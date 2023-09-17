export const MemberName = ['Yejun', 'Noah', 'Bamby', 'Eunho', 'Hamin', 'Plli'] as const;

export interface MemberData {
  name: (typeof MemberName)[number];
  nickname: string;
  color: `#${string}`;
  backgroundColor: `#${string}`;
  iconName: string;
}

export type Member = {
  [key in (typeof MemberName)[number]]: MemberData;
};

export const MEMBER: Member = {
  Yejun: {
    name: 'Yejun',
    nickname: '예준 (Yejun)',
    color: '#5a9bff',
    backgroundColor: '#e5f0ff',
    iconName: 'ic_yejun',
  },
  Noah: {
    name: 'Noah',
    nickname: '노아 (Noah)',
    color: '#ae3ce7',
    backgroundColor: '#ede5ff',
    iconName: 'ic_noah',
  },
  Bamby: {
    name: 'Bamby',
    nickname: '밤비 (Bamby)',
    color: '#f3398b',
    backgroundColor: '#ffe5f6',
    iconName: 'ic_bamby',
  },
  Eunho: {
    name: 'Eunho',
    nickname: '은호 (Eunho)',
    color: '#c02929',
    backgroundColor: '#ffe5e5',
    iconName: 'ic_eunho',
  },
  Hamin: {
    name: 'Hamin',
    nickname: '하민 (Hamin)',
    color: '#00DFAA',
    backgroundColor: '#dffbde',
    iconName: 'ic_hamin',
  },
  Plli: {
    name: 'Plli',
    nickname: '플리 (PLLI)',
    color: '#000000',
    backgroundColor: '#ffffff',
    iconName: 'ic_plli',
  },
};

export const createMemberStyleClass = (type: 'text' | 'bg', name?: (typeof MemberName)[number]) =>
  `${type}-${(name || MEMBER.Plli.name).toLowerCase()}`;

export const MEMBER_STYLE_CLASS = {
  TEXT_COLOR: {
    Yejun: 'text-yejun',
    Noah: 'text-noah',
    Bamby: 'text-bamby',
    Eunho: 'text-eunho',
    Hamin: 'text-hamin',
    Pill: 'text-plii',
  },
};

export const findMemberData = (nickname: string) => {
  const memberData = Object.values(MEMBER).find(
    ({ nickname: memberNickname }) => memberNickname?.replace(/\s+/g, '') === nickname?.replace(/\s+/g, ''),
  );
  return memberData || MEMBER.Plli;
};
