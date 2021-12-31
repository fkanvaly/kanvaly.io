import Link from 'next/link';
import useSWR from 'swr';
import cn from 'classnames';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import Image from 'next/image';

export default function GradientCard({ title, href, gradient}) {
  return (
      <a
        className={cn(
          'transform hover:scale-[1.01] transition-all',
          'rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1',
          gradient
        )}
        href={href}
      >
        <div className=" bg-white dark:bg-gray-900 rounded-lg p-2">
            <h4 className="text-center text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-100 tracking-tight">
              {title}
            </h4>
      </div>
      </a>
  );
}
