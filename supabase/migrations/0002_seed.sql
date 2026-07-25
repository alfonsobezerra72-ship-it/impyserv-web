-- Datos iniciales: los mismos que usa el sitio como ejemplo en
-- src/lib/data/products.ts y src/lib/data/projects.ts, para no perder el
-- contenido ya redactado al pasar a Supabase.

insert into products (name, brand, capacity_btu, type, price, description, active) values
  ('Split LG 9000 BTU', 'LG', 9000, 'split', 2800, 'Ideal para dormitorios y ambientes pequeños.', true),
  ('Split Samsung 9000 BTU', 'Samsung', 9000, 'split', 2900, 'Ideal para dormitorios y ambientes pequeños.', true),
  ('Split LG 12000 BTU', 'LG', 12000, 'split', 3400, 'Para salas y oficinas medianas.', true),
  ('Split Samsung 12000 BTU', 'Samsung', 12000, 'split', 3500, 'Para salas y oficinas medianas.', true),
  ('Split LG 18000 BTU', 'LG', 18000, 'split', 4600, 'Para ambientes amplios o comercios pequeños.', true),
  ('Split Samsung 18000 BTU', 'Samsung', 18000, 'split', 4750, 'Para ambientes amplios o comercios pequeños.', true),
  ('Split LG 24000 BTU', 'LG', 24000, 'split', 5900, 'Para oficinas grandes y locales comerciales.', true),
  ('Split Samsung 24000 BTU', 'Samsung', 24000, 'split', 6100, 'Para oficinas grandes y locales comerciales.', true),
  ('Split LG 36000 BTU', 'LG', 36000, 'split', 8200, 'Para espacios comerciales de gran superficie.', true),
  ('Split Samsung 60000 BTU', 'Samsung', 60000, 'split', 13500, 'Alta capacidad para naves y salones grandes.', true),
  ('Central LG 60000 BTU', 'LG', 60000, 'central', 15800, 'Sistema central para climatización de múltiples ambientes.', true),
  ('Sistema VRF LG Multi V', 'LG', 60000, 'vrf', 24500, 'Sistema VRF para edificios y proyectos grandes, cotización según diseño.', true);

insert into projects (slug, client_name, location, category, description, featured) values
  ('cooperativa-jesus-nazareno', 'Cooperativa Jesús Nazareno', 'Santa Cruz de la Sierra', 'cooperativa', 'Climatización de oficinas en la zona Chiquitania, Pampa de la Isla y Cochabamba.', true),
  ('caja-petrolera-quirofanos', 'Caja Petrolera de Santa Cruz', 'Santa Cruz de la Sierra', 'salud', 'Remodelación integral del sistema de climatización de los quirófanos de la Caja Petrolera.', true),
  ('hotel-mito-andino', 'Hotel Mito Andino', 'Uyuni', 'hoteleria', 'Climatización de Hotel Mito Andino, hotel boutique 5 estrellas en el salar de Uyuni.', true),
  ('qq-medical', 'Q&Q Medical', 'Santa Cruz de la Sierra', 'edificio', 'Climatización de las nuevas oficinas de Q&Q Medical en Santa Cruz.', true);
