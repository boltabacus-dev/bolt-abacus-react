import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {}

const BrandLogo: FC<BrandLogoProps> = () => {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="BoltAbacus logo"
        width={200}
        height={50}
        className="cursor-pointer"
      />
    </Link>
  );
};

export default BrandLogo;
