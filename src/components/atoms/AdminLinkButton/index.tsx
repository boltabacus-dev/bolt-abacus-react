import { FC } from 'react';

export interface AdminLinkButtonProps {
  text: string;
  active: boolean;
}

const AdminLinkButton: FC<AdminLinkButtonProps> = ({ text, active }) => {
  return (
    <div
      className={`p-1 rounded-md ${
        active ? 'bg-gold font-bold text-black px-4 ' : ''
      }`}
    >
      {text}
    </div>
  );
};

export default AdminLinkButton;
