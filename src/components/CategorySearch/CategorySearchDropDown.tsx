import CategorySearchResultsCard from "./CategorySearchResultsCard";
import "./CategorySearchBar.css";

type CategorySearchDropDownProps = {
  showSearchDropDown: string;
  setShowSearchDropDown: Function;
  setSearchBarBorderColor: Function;
};

export default function CategorySearchDropDown({
  showSearchDropDown,
  setShowSearchDropDown,
  setSearchBarBorderColor,
}: CategorySearchDropDownProps) {
  return (
    <div
      className="category-drop-down-container"
      style={{
        display: `${showSearchDropDown}`,
      }}
    >
      <div className="category-search-data-container">
        <CategorySearchResultsCard
          setSearchBarBorderColor={setSearchBarBorderColor}
          setShowSearchDropDown={setShowSearchDropDown}
        />
      </div>
    </div>
  );
}
