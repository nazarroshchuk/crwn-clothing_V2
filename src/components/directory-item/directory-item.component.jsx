import './directory-item.styles';
import { BackgroundImage, Body, DirectoryItemComponent } from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemComponent>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemComponent>
  );
};

export default DirectoryItem;
