import { Fragment } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectorIsLoading } from "../../store/category/category.selectors";
import { Spinner } from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectorIsLoading);
console.log(isLoading)
  return (
    <Fragment>
      {isLoading
        ? (<Spinner/>)
        : (Object.keys(categoriesMap).map(title => (
          <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
        )))
      }
    </Fragment>
  )
}

export default CategoriesPreview;