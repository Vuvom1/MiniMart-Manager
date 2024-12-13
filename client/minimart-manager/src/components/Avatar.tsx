import { DEFAULT_AVATAR } from '../constant/strings';

interface AvatarProps {
  src?: string;  
  size?: string;  
}

export default function Avatar({
  src,
  size = '40px',
}: AvatarProps) {
  return (
    <div
      className="rounded-full bg-gray-200 flex items-center justify-center text-white text-xl font-bold overflow-hidden"
      style={{ width: size, height: size }}
    >
      {(src) && (
        <img src={src} alt={DEFAULT_AVATAR} className="w-full h-full object-cover" />
      )}
    </div>
  );
}