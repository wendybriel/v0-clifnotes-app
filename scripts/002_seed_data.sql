-- Insert Spain as a destination
INSERT INTO public.destinations (id, name, country, description, image_url, weather_info, safety_info)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Barcelona',
  'Spain',
  'Barcelona is a vibrant coastal city known for its architecture, culture, and Mediterranean charm.',
  '/placeholder.svg?height=400&width=600',
  '{"summer": "Hot and sunny, 25-30°C", "winter": "Mild, 10-15°C", "spring": "Pleasant, 15-20°C", "fall": "Comfortable, 18-23°C"}',
  'Spain is generally safe. Watch out for pickpockets in tourist areas. Emergency number: 112'
);

-- Insert attractions for Barcelona
INSERT INTO public.attractions (destination_id, name, description, category, location, rating)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Sagrada Família', 'Gaudí''s iconic basilica, a UNESCO World Heritage site', 'Architecture', 'Carrer de Mallorca, 401', 4.8),
  ('00000000-0000-0000-0000-000000000001', 'Park Güell', 'Colorful park with mosaic art and city views', 'Park', 'Carrer d''Olot', 4.7),
  ('00000000-0000-0000-0000-000000000001', 'La Rambla', 'Famous tree-lined pedestrian street', 'Street', 'La Rambla', 4.5),
  ('00000000-0000-0000-0000-000000000001', 'Casa Batlló', 'Modernist building designed by Gaudí', 'Architecture', 'Passeig de Gràcia, 43', 4.7),
  ('00000000-0000-0000-0000-000000000001', 'Gothic Quarter', 'Medieval neighborhood with narrow streets', 'Neighborhood', 'Barri Gòtic', 4.6),
  ('00000000-0000-0000-0000-000000000001', 'Camp Nou', 'FC Barcelona''s iconic football stadium', 'Sports', 'C. d''Aristides Maillol', 4.7);

-- Insert restaurants
INSERT INTO public.restaurants (destination_id, name, description, cuisine, price_range, address, recommended_by)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Cervecería Catalana', 'Amazing tapas and local atmosphere', 'Tapas', '€€', 'Carrer de Mallorca, 236', 'Rachel Ray'),
  ('00000000-0000-0000-0000-000000000001', 'El Xampanyet', 'Traditional tapas bar with authentic vibe', 'Tapas', '€', 'Carrer de Montcada, 22', 'Rachel Ray'),
  ('00000000-0000-0000-0000-000000000001', 'Can Culleretes', 'Oldest restaurant in Barcelona since 1786', 'Catalan', '€€', 'Carrer Quintana, 5', 'Rachel Ray'),
  ('00000000-0000-0000-0000-000000000001', 'Tickets Bar', 'Creative tapas by Albert Adrià', 'Modern Tapas', '€€€', 'Avinguda del Paral·lel, 164', 'Rachel Ray');

-- Insert common Spanish phrases
INSERT INTO public.phrases (destination_id, category, english, translation, pronunciation)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Greetings', 'Hello', 'Hola', 'OH-lah'),
  ('00000000-0000-0000-0000-000000000001', 'Greetings', 'Good morning', 'Buenos días', 'BWAY-nohs DEE-ahs'),
  ('00000000-0000-0000-0000-000000000001', 'Greetings', 'Good evening', 'Buenas tardes', 'BWAY-nahs TAR-des'),
  ('00000000-0000-0000-0000-000000000001', 'Greetings', 'Goodbye', 'Adiós', 'ah-DYOHS'),
  ('00000000-0000-0000-0000-000000000001', 'Basics', 'Please', 'Por favor', 'pohr fah-VOHR'),
  ('00000000-0000-0000-0000-000000000001', 'Basics', 'Thank you', 'Gracias', 'GRAH-syahs'),
  ('00000000-0000-0000-0000-000000000001', 'Basics', 'You''re welcome', 'De nada', 'deh NAH-dah'),
  ('00000000-0000-0000-0000-000000000001', 'Basics', 'Excuse me', 'Perdón', 'pehr-DOHN'),
  ('00000000-0000-0000-0000-000000000001', 'Questions', 'Where is...?', '¿Dónde está...?', 'DOHN-deh ehs-TAH'),
  ('00000000-0000-0000-0000-000000000001', 'Questions', 'How much?', '¿Cuánto cuesta?', 'KWAN-toh KWES-tah'),
  ('00000000-0000-0000-0000-000000000001', 'Questions', 'Do you speak English?', '¿Habla inglés?', 'AH-blah een-GLEHS'),
  ('00000000-0000-0000-0000-000000000001', 'Dining', 'I would like...', 'Me gustaría...', 'meh goos-tah-REE-ah'),
  ('00000000-0000-0000-0000-000000000001', 'Dining', 'The check, please', 'La cuenta, por favor', 'lah KWEN-tah pohr fah-VOHR'),
  ('00000000-0000-0000-0000-000000000001', 'Dining', 'Water', 'Agua', 'AH-gwah'),
  ('00000000-0000-0000-0000-000000000001', 'Dining', 'Wine', 'Vino', 'VEE-noh');
