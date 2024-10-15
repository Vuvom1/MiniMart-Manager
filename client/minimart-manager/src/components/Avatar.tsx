import React from 'react';

interface AvatarProps {
  src?: string; 
  alt?: string;  
  size?: string;  
  initials?: string; 
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = '40px',
  initials = 'AB',  
}: AvatarProps) {
  return (
    <div
      className="rounded-full bg-gray-200 flex items-center justify-center text-white text-xl font-bold overflow-hidden"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span> 
      )}
    </div>
  );
}