import Link from 'next/link';

import Heading from '@/components/heading';
import { paths } from '@/paths';
import { getBaseUrl } from '@/utils/url';

const HomePage = () => {
  const baseUrl = getBaseUrl();
  console.log(baseUrl);

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Home" description="Your home place to start" />
      <div className="flex justify-center mt-8">
        <Link href={paths.tickets} className="underline">
          Go to tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
