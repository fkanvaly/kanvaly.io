import Link from 'next/link';
import useSWR from 'swr';
import cn from 'classnames';

// import fetcher from 'lib/fetcher';
// import { Views } from 'lib/types';
import type { Project } from '.contentlayer/types';

export default function ProjectPost({
  title,
  summary,
  slug, 
  image
}: Pick<Project, 'title' | 'summary' | 'slug' | 'image'>) {
  // const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  return (
    <Link href={`/project/${slug}`}>
      <a className={cn(
          'transform hover:scale-[1.01] transition-all',
          'w-full mb-8'
        )}>
        <div className="flex flex-row-reverse justify-between w-full rounded-2xl border-2 overflow-hidden">
          <img className='w-32 md:w-52 h-auto object-contain' src={image}/>
          <div className='mt-6 mx-6'>
            <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
              {title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{summary}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
