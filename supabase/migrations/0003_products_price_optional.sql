-- El catálogo público ya no muestra precios (se pasó a "Cotizar" para todo
-- el catálogo). El precio queda como campo interno opcional en el admin.
alter table products alter column price drop not null;
