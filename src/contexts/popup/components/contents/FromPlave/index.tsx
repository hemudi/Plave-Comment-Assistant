import useCommentList from '@contexts/popup/hooks/useCommentList';
import usePostInfo from '@contexts/popup/hooks/usePostInfo';
import CommentItem from '@contexts/popup/components/contents/FromPlave/CommentItem';
import { createMemberStyleClass, findMemberData } from '@constants/member';

const EMPTY_COMMENT_TEXT = '스크랩 된 댓글이 없습니다!';

const FromPlave = () => {
  const { author, title } = usePostInfo();
  const commentList = useCommentList();
  const authorData = findMemberData(author);

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <h1 className="flex w-full h-fit gap-1 items-center px-3">
        <span className={`${createMemberStyleClass('text', authorData.name)} text-lg font-bold`}>{author}</span>
        <span className="text-neutral-700 text-lg font-bold">{title}</span>
      </h1>
      {!commentList || commentList?.size <= 0 ? (
        <div className="flex w-full h-full items-center justify-center p-3 warning-text ">{EMPTY_COMMENT_TEXT}</div>
      ) : (
        <ul className="flex flex-col gap-4 p-2 w-full">
          {[...commentList.values()].map((commentData) => (
            <CommentItem key={commentData.seq} {...commentData} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FromPlave;
