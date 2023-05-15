import React from 'react';
import { download } from '@/public/assets';
import { downloadImage } from '@/utils';
import Avatar from './Avatar';

interface Props {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

const Card: React.FC<Props> = ({ _id, name, photo, prompt }) => {
  return (
    <div className='relative rounded-xl group shadow-card hover:shadow-cardhover card'>
      <img
        src={photo}
        alt={prompt}
        className='w-full h-auto object-cover rounded-xl'
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute inset-0 top-auto bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-sm sm:text-base overflow-y-auto'>{prompt}</p>

        <div className='mt-5 flex justify-between items-center'>
          <Avatar name={name} />

          <button className='outline-none bg-transparent border-none' onClick={() => downloadImage(_id, photo)}>
            <img src={download.src} alt="download" className='h-7 w-7 object-contain invert' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card