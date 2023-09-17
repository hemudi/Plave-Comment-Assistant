import { MEMBER, findMemberData } from '@constants/member';
import { MESSAGE_TYPE, sendMessage } from '@utils/message';

const getIframeDocument = () => {
  const IFrame = document.querySelector('iframe') as HTMLIFrameElement;
  const IFrameDocument = IFrame?.contentDocument;
  return IFrameDocument;
};

const SCRAP_BUTTON = {
  TYPE: 'button',
  STYLE: 'padding: 0 21px',
  CLASSES: ['btn_g', 'scrap_btn'],
  IMG: {
    TYPE: 'img',
    STYLE: 'width: 100%; height: 100%; object-fit: cover;',
    URL: 'assets/icons/logo/ic_logo_1_48.png',
  },
};

const createScrapButton = (ButtonArea: HTMLDivElement) => {
  const Image = document.createElement(SCRAP_BUTTON.IMG.TYPE);
  const imageURL = chrome.runtime.getURL(SCRAP_BUTTON.IMG.URL);
  Image.setAttribute('style', SCRAP_BUTTON.IMG.STYLE);
  Image.setAttribute('src', imageURL);

  const ScrapButton = document.createElement(SCRAP_BUTTON.TYPE);
  ScrapButton.setAttribute('style', SCRAP_BUTTON.STYLE);
  ScrapButton.classList.add(...SCRAP_BUTTON.CLASSES);

  ScrapButton.appendChild(Image);
  ButtonArea.appendChild(ScrapButton);

  return ScrapButton;
};

const getPostInfo = (IFrameDocument: Document) => {
  const TitleInfo = IFrameDocument?.querySelector('.tit_info');
  const author = TitleInfo?.querySelector('span')?.textContent || '';
  const title = TitleInfo?.lastChild?.textContent?.trim() || '';
  return { author, title };
};

const scrapCommentData = (Comment: HTMLLIElement) => {
  const { seq, nickname, parseq } = Comment.dataset;
  const thumbnail = Comment.querySelector('img')?.src;
  const date = Comment.querySelector('.txt_date')?.textContent;
  const comment = Comment.querySelector('.original_comment')?.innerHTML;
  const isReply = parseq !== '0';
  const isMember = false;

  let attachImage = (Comment.querySelector('.normal_thumb img') as HTMLImageElement)?.src;

  if (attachImage?.includes('emoticons')) {
    attachImage = '';
  }

  return { seq, parseq, nickname, thumbnail, date, comment, attachImage, isReply, isMember };
};

const getNextPageButton = () => {
  const IFrame = document.querySelector('iframe') as HTMLIFrameElement;
  const IframeDocument = IFrame?.contentDocument;
  const NextPageButton = IframeDocument?.querySelector('a.next') as HTMLAnchorElement;
  return NextPageButton;
};

const paintBackground = (Comment: HTMLLIElement) => {
  const memberData = findMemberData(Comment.dataset.nickname || '');
  if (memberData && memberData.nickname !== MEMBER.Plli.nickname) {
    Comment.style.backgroundColor = memberData.backgroundColor;
  }
};

const searchMemberComment = (CommentList: HTMLUListElement) => {
  const commentMap = new Map();
  return (mutations: MutationRecord[], observer: MutationObserver) => {
    Array.prototype.map.call(CommentList.children, (Comment: HTMLLIElement) => {
      paintBackground(Comment);
      const CommentData = scrapCommentData(Comment);
      commentMap.set(CommentData.seq, CommentData);
    });
    const NextPageButton = getNextPageButton();
    if (NextPageButton) {
      NextPageButton.click();
    } else {
      sendMessage({
        type: MESSAGE_TYPE.COMMENT,
        payload: [...commentMap],
      });
      observer.disconnect();
    }
  };
};

const setCommentObserver = (CommentList: HTMLUListElement) => {
  const observer = new MutationObserver(searchMemberComment(CommentList));
  observer.observe(CommentList, {
    childList: true,
    subtree: true,
  });
};

const appendScrapButton = (ButtonArea: HTMLDivElement) => {
  const ScrapButton = createScrapButton(ButtonArea);

  ScrapButton.addEventListener('click', () => {
    const IFrameDocument = getIframeDocument();
    const PaginationList = IFrameDocument?.querySelector('#comment-paging ul') as HTMLUListElement;
    const CommentList = IFrameDocument?.querySelector('.list_comment') as HTMLUListElement;
    const currentPageNum = PaginationList.querySelector('li.active')?.firstChild?.textContent || '';

    const isFirst = +currentPageNum === 1;

    if (isFirst) {
      const SecondButton = PaginationList.querySelector('[href="#page-2"]') as HTMLAnchorElement;
      SecondButton?.click();
    }

    setCommentObserver(CommentList);
    const firstNumButton = PaginationList.querySelector('[href="#page-1"]') as HTMLAnchorElement;
    firstNumButton?.click();
  });
};
const runCommentObserver = () => {
  const IFrameDocument = getIframeDocument();
  const CommentList = IFrameDocument?.querySelector('.list_comment') as HTMLUListElement;
  const PaginationList = IFrameDocument?.querySelector('#comment-paging ul') as HTMLUListElement;
  const ButtonArea = IFrameDocument?.querySelector('.cont_recommendation .area_r') as HTMLDivElement;

  const isNotExecute = !CommentList || !IFrameDocument || !PaginationList || !ButtonArea;
  if (isNotExecute) {
    console.error('Cannot execute because observing element is null.');
    return;
  }

  appendScrapButton(ButtonArea);
  sendMessage({ type: MESSAGE_TYPE.POST_INFO, payload: getPostInfo(IFrameDocument) });
};

export default runCommentObserver;
