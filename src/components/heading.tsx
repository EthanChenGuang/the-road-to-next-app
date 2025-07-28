import { Separator } from '@/components/ui/separator';

type HeadingProps = {
  title: string;
  description: string;
};

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Separator />
    </div>
  );
};

export default Heading;
