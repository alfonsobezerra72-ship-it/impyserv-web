const ITEMS = [
  "+10 años de trayectoria",
  "+300 equipos instalados",
  "Garantía de 2 años",
  "Emergencias 24/7",
];

export function TrustBar() {
  return (
    <section className="bg-secondary/15 border-y border-secondary/30">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-4 py-6 text-center sm:px-6 md:grid-cols-4">
        {ITEMS.map((item) => (
          <p key={item} className="text-sm font-semibold text-primary sm:text-base">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
