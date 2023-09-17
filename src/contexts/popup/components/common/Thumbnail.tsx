const Thumbnail = ({ thumbnailURL }: { thumbnailURL: string }) => (
  <img className="w-12 h-12 rounded-full ml-4" src={thumbnailURL} alt="thumbnail" />
);

export default Thumbnail;
