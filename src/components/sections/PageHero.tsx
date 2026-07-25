export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}
