const VERSION = '1.0.1';
const PEOPLE_INFO = {
  DEVELOPER: {
    NAME: '해삼스무디',
    URL: 'https://twitter.com/dev_smoothie',
  },
  DESIGNER: {
    NAME: '꿍쫙',
    URL: 'https://twitter.com/dujjxx',
  },
};

const Footer = () => (
  <footer className="flex flex-col justify-center items-center w-full h-fit text-neutral-500">
    <span>{`Version ${VERSION}`}</span>
    <span>
      {`Developed by `}
      <a
        className="font-bold hover:text-noah"
        href={PEOPLE_INFO.DEVELOPER.URL}
        target="_blank"
        rel="noreferrer"
      >{`${PEOPLE_INFO.DEVELOPER.NAME}`}</a>
    </span>
    <span>
      {`Designed by `}
      <a
        className="font-bold hover:text-hamin"
        href={PEOPLE_INFO.DESIGNER.URL}
        target="_blank"
        rel="noreferrer"
      >{`${PEOPLE_INFO.DESIGNER.NAME}`}</a>
    </span>
  </footer>
);

export default Footer;
