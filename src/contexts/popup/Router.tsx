import CaTalk from '@contexts/popup/components/contents/CaTalk';
import InsideCafe from '@contexts/popup/components/pages/InsideCafe';
import NotPost from '@contexts/popup/components/pages/NotPost';
import OutsideCafe from '@contexts/popup/components/pages/OutsideCafe';
import useCurrentURL from '@contexts/popup/hooks/useCurrentURL';
import { CATEGORY_ID, PLAVE_URL, ParsedUrl } from '@utils/path';
import FromPlave from '@contexts/popup/components/contents/FromPlave';
import Loading from '@contexts/popup/components/pages/Loading';

const isOutsideCafe = (pathName?: string) => !pathName || pathName === '' || pathName !== PLAVE_URL.PATHNAME;
const isInsideCaTalk = (categoryId: string) => categoryId === CATEGORY_ID.CAELUM_TALK;
const isInsideComment = (categoryId: string, postId: string) =>
  categoryId === CATEGORY_ID.FROM_PLAVE && postId !== '' && postId;

const getCurrentContents = ({ categoryId, postId }: ParsedUrl) => {
  if (isInsideCaTalk(categoryId)) return <CaTalk />;
  if (isInsideComment(categoryId, postId)) return <FromPlave />;
  return <NotPost />;
};

const getCurrentPage = (parsedUrl: ParsedUrl) => {
  if (isOutsideCafe(parsedUrl.pathName)) return <OutsideCafe />;
  return <InsideCafe>{getCurrentContents(parsedUrl)}</InsideCafe>;
};

const Router = () => {
  const url = useCurrentURL();
  return url ? getCurrentPage(url) : <Loading />;
};

export default Router;
