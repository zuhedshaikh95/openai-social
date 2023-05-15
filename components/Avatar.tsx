interface Props {
    name: string;
}

const Avatar: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-sm font-semibold">
            {name[0]}
        </div>
        <p className="text-white text-sm">{name}</p>
    </div>
  )
}

export default Avatar