"use client";
import { ScrollArea } from "@repo/ui/src/components/ui/scroll-area";
import { category_dummy_data } from "@repo/web/test_db/category_dummy_data";
import {
  new_arrival_header_dropdown_dummy_data as newArrival,
  top_categories_header_dropdown_dummy_data as topCategories,
} from "@repo/web/test_db/header_dropdown_dummy_data";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Interfaces for props
interface ICategoryListProps {
  title: string;
  categories: string[];
}

interface ICategoryData {
  thumbnail: string;
  category: string;
}

interface CategoriesImageGridProps {
  data: ICategoryData[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Single Category List Component
const CategoryList: React.FC<ICategoryListProps> = ({ title, categories }) => (
  <ScrollArea className="h-[25rem] w-max pr-[3rem]">
    <div className="link-group py-8">
      <h3 className="w-max border-b border-black pb-1 text-base font-medium capitalize">
        {title}
      </h3>
      <div className="categories-group mt-4 flex flex-col gap-1">
        {categories.map((category, index) => (
          <p
            key={index}
            className="cursor-pointer text-sm font-medium text-gray-600 duration-300 hover:text-orange-500"
          >
            {category}
          </p>
        ))}
      </div>
    </div>
  </ScrollArea>
);

// Categories Image Grid Component
const CategoriesImageGrid: React.FC<CategoriesImageGridProps> = ({
  data,
  setIsOpen,
}) => (
  <ScrollArea className="h-[25rem] w-max">
    <div className="category-image-details-wrapper col-span-3 py-10">
      <div className="category-image-holder grid gap-10 lg:grid-cols-5 xl:grid-cols-6">
        {data.map((item, index) => (
          <Link onClick={() => setIsOpen(false)} href="/" key={index}>
            <div className="category-cart-body w-[5rem]">
              <div
                className="product-image h-[5rem] w-[5rem] rounded-full border-2 border-transparent bg-cover bg-center bg-no-repeat duration-300 hover:border-orange-500"
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                }}
              ></div>
              <div className="category-title mt-1 text-center text-xs font-medium">
                {item.category}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </ScrollArea>
);

// Main Component
const HeaderCategoriesDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropDownButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        dropDownButtonRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        !dropDownButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <p
          ref={dropDownButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer items-center gap-2 text-sm font-medium duration-300 hover:text-orange-500"
        >
          <Menu className="w-4" /> Category
        </p>
      </div>

      <div
        className={`absolute left-0 z-50 mt-3 w-screen transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
      >
        {isOpen && (
          <div
            ref={dropDownRef}
            className="absolute z-20 mx-auto h-[30rem] w-full bg-white pb-20"
          >
            <div className="container grid grid-cols-5 gap-20 xl:w-[1200px]">
              <CategoryList title="Top categories" categories={topCategories} />
              <CategoryList title="New arrival" categories={newArrival} />
              <CategoriesImageGrid
                data={category_dummy_data}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderCategoriesDropDown;
