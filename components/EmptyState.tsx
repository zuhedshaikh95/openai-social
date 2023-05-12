interface Props {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<Props> = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      <h2 className="font-light text-neutral-500 mt-1">{subtitle}</h2>
    </div>
  );
};

export default EmptyState;
