import DirectoryItem from '../directory-item/directory-item.component';
import './directory.styles';
import { DirectoryContainer } from "./directory.styles";
import { CATEGORIES } from "../../routes/home/constant";

const Directory = () =>(
    <DirectoryContainer>
      {CATEGORIES.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );


export default Directory;
