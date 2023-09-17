import { PLAVE_URL } from '@utils/path';
import Button from '@contexts/popup/components/common/Button';

const OutsideCafe = () => {
  const handleOnClick = () => {
    window.open(PLAVE_URL.HREF, '_black');
  };
  return (
    <div className="flex items-center justify-center w-full">
      <Button
        className="transition-all duration-500 enabled:bg-blue-500 enabled:active:bg-blue-500 text-xl font-bold rounded-full w-60 h-60 bg-gradient-to-r background-gradient"
        onClick={handleOnClick}
      >
        아스테룸으로 이동하기
      </Button>
    </div>
  );
};

export default OutsideCafe;
