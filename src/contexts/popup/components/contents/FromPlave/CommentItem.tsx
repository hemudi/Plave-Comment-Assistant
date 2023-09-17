import { CommentData } from '@store/comment';
import { parseHTMLString } from '@contexts/popup/utils/parser';
import { MEMBER } from '@constants/member';
import Thumbnail from '@contexts/popup/components/common/Thumbnail';
import Icon from '@contexts/popup/components/common/Icon';

const PLLI_THUMBNAIL = 'assets/icons/logo/ic_logo_1_48.png';

const COMMENT_STYLE = {
  Yejun: 'before:bg-yejun',
  Noah: 'before:bg-noah',
  Bamby: 'before:bg-bamby',
  Eunho: 'before:bg-eunho',
  Hamin: 'before:bg-hamin',
  Plli: 'before:bg-plli',
};

const CommentTemplate = ({
  thumbnail,
  date,
  nickname,
  comment,
  attachImage,
  isReply,
  isMember,
  memberName = 'Plli',
}: Omit<CommentData, 'replies'>) => (
  <li
    className={`${isReply ? 'pl-5' : ''} ${
      COMMENT_STYLE[memberName]
    } relative flex gap-2 w-full whitespace-pre-wrap before:content-[''] before:absolute before:top-0 before:bottom-0 before:inline-block before:w-[2px] before:h-full`}
  >
    <Thumbnail thumbnailURL={isMember ? thumbnail : PLLI_THUMBNAIL} />
    <div className="flex flex-col text-sm gap-1">
      <div className="flex gap-2">
        <Icon type={memberName} />
        <span className="font-bold">{isMember ? nickname : `플리 (${MEMBER.Plli.name})`}</span>
        <span className="text-neutral-700">{date}</span>
      </div>
      {attachImage && attachImage !== '' && <img width={80} height={80} src={attachImage} alt="댓글 첨부 이미지" />}
      <div>{parseHTMLString(comment)}</div>
    </div>
  </li>
);

const CommentItem = ({ replies, ...props }: CommentData) => (
  <>
    <CommentTemplate {...props} />
    {replies?.length > 0 &&
      Array.from(replies.values()).map((commentData) => <CommentTemplate key={commentData.seq} {...commentData} />)}
  </>
);

export default CommentItem;
