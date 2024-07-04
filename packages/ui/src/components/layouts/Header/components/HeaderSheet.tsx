"use client";

import {
  new_arrival_header_dropdown_dummy_data as newArrival,
  top_categories_header_dropdown_dummy_data as topCategories,
} from "@repo/web/test_db/header_dropdown_dummy_data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/src/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@repo/ui/src/components/ui/sheet";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Define the interfaces for the props
interface HeaderLinkProps {
  title: string;
}

interface CategoryLinkProps {
  category: string;
}

interface AccordionSectionProps {
  title: string;
  categories: string[];
}

export function HeaderSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </SheetTrigger>
      <SheetContent className="w-full" side="left">
        <div className="logo">
          <h2 className="text-xl font-semibold text-black">Banizzik.com</h2>
        </div>
        <div className="banizzik-links mt-10 space-y-2">
          <HeaderLink title="About Us" />
          <HeaderLink title="Contact Us" />
          <HeaderLink title="Get Our App" />
        </div>
        <div className="categories">
          <Accordion type="single" collapsible className="w-full">
            <AccordionSection
              title="Top Categories"
              categories={topCategories}
            />
            <AccordionSection title="New Arrival" categories={newArrival} />
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ title }) => (
  <h3 className="flex justify-between border-b py-3 text-lg font-medium">
    {title}
    <span>
      <ArrowUpRight className="w-[1rem]" />
    </span>
  </h3>
);

const CategoryLink: React.FC<CategoryLinkProps> = ({ category }) => (
  <Link
    className="block text-black duration-300 hover:text-orange-500"
    href="/"
  >
    {category}
  </Link>
);

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  categories,
}) => (
  <AccordionItem value={title.toLowerCase().replace(" ", "-")}>
    <AccordionTrigger className="text-lg font-medium no-underline hover:no-underline">
      {title}
    </AccordionTrigger>
    <AccordionContent className="space-y-1">
      {categories.map((category, index) => (
        <CategoryLink key={index} category={category} />
      ))}
    </AccordionContent>
  </AccordionItem>
);

export default HeaderSheet;
