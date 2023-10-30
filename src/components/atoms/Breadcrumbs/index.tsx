import { FC } from 'react';

export interface BreadcrumbsProps {
  links: Array<string>;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links }) => {
  return (
    <div className="flex">
      <p className="bg-[#212121] py-2 px-4 rounded-full">
        {links.map((link, index) => {
          if (index + 1 === links.length) {
            return (
              <span key={index} className="font-bold text-sm tablet:text-md">
                {link}
              </span>
            );
          }
          return (
            <span key={link}>
              <span className="font-bold text-sm tablet:text-md">{link}</span>
              <span className="px-2 font-bold text-sm tablet:text-md">/</span>
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Breadcrumbs;
