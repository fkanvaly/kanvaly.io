import Container from 'components/Container';

export default function ConnectorLayout({ children }) {
  return (
    <Container
      title="Connector 🌱 – Kanvaly Fadiga"
      description="Resource"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Resources
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
          This page is dedicated to resources and blogs that I find interesting
        </p>
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
