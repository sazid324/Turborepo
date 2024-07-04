import {
  footer_popular_categories,
  footer_sale_categories,
  footer_top_categories,
  footer_top_deals_categories,
} from "@repo/web/test_db/footer_category";
import Link from "next/link";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineFacebook } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import FooterComponent from "./components/FooterLinkGroup";

const Footer = () => {
  return (
    <>
      <footer className="border-t">
        <div className="footer-wrapper container grid grid-cols-1 md:grid-cols-4 space-y-10 px-6 py-10 lg:grid-cols-6 lg:space-y-0 lg:px-[2rem] lg:py-20 xl:w-[1200px]">
          <div className="contact-group col-span-2 space-y-2 md:w-[20rem]">
            <h3 className="mb-4 text-lg font-semibold">banizzik.com</h3>
            <p className="text-xs text-gray-400 hover:text-orange-500">
              Concord Twin Tower Shopping Complex, Shop No. # 421 (Level-4),
              Shantinagar, Dhaka-1217
            </p>
            <p className="text-xs text-gray-400 hover:text-orange-500">
              +88015328934##
            </p>
            <p className="text-xs text-gray-400 hover:text-orange-500">
              support@banizzik.com
            </p>
            <div className="social-media-icon-group flex items-center gap-2 pt-4">
              <MdOutlineFacebook className="cursor-pointer text-xl duration-300 hover:text-orange-500" />
              <FaInstagram className="h-5 w-5 cursor-pointer text-xl duration-300 hover:text-orange-500" />
              <AiFillTikTok className="h-5 w-5 cursor-pointer text-xl duration-300 hover:text-orange-500" />
              <FaSquareXTwitter className="h-5 w-4 cursor-pointer text-xl duration-300 hover:text-orange-500" />
              <FaYoutube className="cursor-pointer text-xl duration-300 hover:text-orange-500" />
              <SiYoutubeshorts className="h-4 w-4 cursor-pointer text-xl duration-300 hover:text-orange-500" />
            </div>
          </div>

          <div className="quick-links-group space-y-6">
            <div className="group">
              <h3 className="mb-2 text-base font-medium">Top Deals</h3>
              <div className="link-group flex flex-col gap-1 space-y-1 text-xs">
                {footer_top_deals_categories?.map((category, index) => (
                  <Link
                    key={index}
                    className="w-[80%] text-gray-400 hover:text-orange-500"
                    href={"/"}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="popular-category-links-group space-y-6">
            <div className="group">
              <h3 className="mb-2 text-base font-medium">Popular Category</h3>
              <div className="link-group flex flex-col gap-1 space-y-1 text-xs">
                {footer_popular_categories?.map((category, index) => (
                  <Link
                    key={index}
                    className="w-[80%] text-gray-400 hover:text-orange-500"
                    href={"/"}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <div className="group">
              <h3 className="mb-2 text-base font-medium">Top Category</h3>
              <div className="link-group flex flex-col gap-1 space-y-1 text-xs">
                {footer_top_categories?.map((category, index) => (
                  <Link
                    key={index}
                    className="w-[80%] text-gray-400 hover:text-orange-500"
                    href={"/"}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="others-links-group space-y-6">
            <div className="group">
              <h3 className="mb-2 text-base font-medium">Sales</h3>
              <div className="link-group flex flex-col gap-1 space-y-1 text-xs">
                {footer_sale_categories?.map((category, index) => (
                  <Link
                    key={index}
                    className="w-[80%] text-gray-400 hover:text-orange-500"
                    href={"/"}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <FooterComponent />
        </div>
        <div className="footer-bottom font-500 container items-center justify-between border-t p-5 text-xs text-gray-400 lg:flex xl:w-[1200px]">
          <p>Copyright @ 2024 Banizzik.com . All right reserved</p>
          <p>Payment included vat and tax</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
