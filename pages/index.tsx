import Image from 'next/image';
import Link from 'next/link';

import Container from '../components/Container';
import GradientCard from '../components/GradientCard';

export default function Home({ videos }) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col">
          <div className="flex justify-center mb-10">
            <Image
              alt="Kanvaly Fadiga"
              height={176}
              width={176}
              src="/avatar.jpeg"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col px-8">
            <h1 className="text-center font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
              👋 Kanvaly Fadiga
            </h1>
            <h2 className="text-center text-gray-700 dark:text-gray-200 mb-4">
              Data Scientist at <span className="font-semibold">Datadog</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
              Detecting issues faster in high volume of application traces,
              logs, and security signals.
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center gap-6 flex-row px-20">
          <GradientCard title="Blog" gradient="from-[#D8B4FE] to-[#818CF8]" />
          <GradientCard
            title="Project"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          />
          <GradientCard
            title="Resume"
            gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
          />
        </div>
      </div>
    </Container>
  );
}
