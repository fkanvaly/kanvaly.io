import Timeline from '../components/Timeline';
import Container from 'components/Container';
import TopTracks from 'components/TopTracks';

export default function About() {
  return (
    <Container title="About">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
          <p className="text-justify">
            Hey, I'm Kanvaly and like many people today I am interested in
            artificial intelligence. At the moment I am discovering the world of
            the cloud ☁️ at Datadog.
          </p>
        </div>
        <Timeline />
      </div>
    </Container>
  );
}
