-- Insert Barcelona destination
INSERT INTO destinations (name, country, description, image_url) VALUES
('Barcelona', 'Spain', 'A vibrant Mediterranean city known for its art, architecture, and beaches', '/placeholder.svg?height=400&width=600')
ON CONFLICT DO NOTHING;

-- Insert attractions
INSERT INTO attractions (destination_id, name, description, category, image_url, address) VALUES
(1, 'Sagrada Familia', 'Gaudí''s masterpiece basilica, still under construction since 1882', 'Architecture', '/placeholder.svg?height=300&width=400', 'Carrer de Mallorca, 401'),
(1, 'Park Güell', 'Colorful park with mosaic art and stunning city views', 'Park', '/placeholder.svg?height=300&width=400', 'Carrer d''Olot, s/n'),
(1, 'Las Ramblas', 'Famous tree-lined pedestrian street in the heart of Barcelona', 'Street', '/placeholder.svg?height=300&width=400', 'La Rambla'),
(1, 'Casa Batlló', 'Modernist building with unique facade and interior design', 'Architecture', '/placeholder.svg?height=300&width=400', 'Passeig de Gràcia, 43'),
(1, 'Gothic Quarter', 'Medieval neighborhood with narrow streets and historic buildings', 'Neighborhood', '/placeholder.svg?height=300&width=400', 'Barri Gòtic'),
(1, 'La Boqueria Market', 'Vibrant public market with fresh produce and local delicacies', 'Market', '/placeholder.svg?height=300&width=400', 'La Rambla, 91')
ON CONFLICT DO NOTHING;

-- Insert restaurants
INSERT INTO restaurants (destination_id, name, description, cuisine, price_range, image_url, address) VALUES
(1, 'Cal Pep', 'Traditional tapas bar with fresh seafood', 'Spanish Tapas', '$$', '/placeholder.svg?height=300&width=400', 'Plaça de les Olles, 8'),
(1, 'Cervecería Catalana', 'Popular spot for tapas and montaditos', 'Spanish Tapas', '$$', '/placeholder.svg?height=300&width=400', 'Carrer de Mallorca, 236'),
(1, 'El Xampanyet', 'Charming old-school tapas bar serving cava', 'Spanish Tapas', '$', '/placeholder.svg?height=300&width=400', 'Carrer de Montcada, 22'),
(1, 'Can Culleretes', 'Barcelona''s oldest restaurant, serving since 1786', 'Catalan', '$$', '/placeholder.svg?height=300&width=400', 'Carrer Quintana, 5'),
(1, 'Quimet & Quimet', 'Tiny bar famous for montaditos and canned seafood', 'Tapas', '$', '/placeholder.svg?height=300&width=400', 'Carrer del Poeta Cabanyes, 25')
ON CONFLICT DO NOTHING;

-- Insert common Spanish phrases
INSERT INTO phrases (category, english, spanish, pronunciation) VALUES
('Greetings', 'Hello', 'Hola', 'OH-lah'),
('Greetings', 'Good morning', 'Buenos días', 'BWAY-nos DEE-ahs'),
('Greetings', 'Good afternoon', 'Buenas tardes', 'BWAY-nahs TAR-days'),
('Greetings', 'Good evening', 'Buenas noches', 'BWAY-nahs NOH-chess'),
('Greetings', 'Goodbye', 'Adiós', 'ah-dee-OHS'),
('Basics', 'Please', 'Por favor', 'por fah-VOR'),
('Basics', 'Thank you', 'Gracias', 'GRAH-see-ahs'),
('Basics', 'You''re welcome', 'De nada', 'day NAH-dah'),
('Basics', 'Excuse me', 'Perdón', 'pehr-DOHN'),
('Basics', 'I''m sorry', 'Lo siento', 'loh see-EN-toh'),
('Dining', 'The check please', 'La cuenta, por favor', 'lah KWEN-tah, por fah-VOR'),
('Dining', 'Water', 'Agua', 'AH-gwah'),
('Dining', 'Menu', 'Menú', 'meh-NOO'),
('Dining', 'Delicious', 'Delicioso', 'deh-lee-see-OH-so'),
('Questions', 'How much?', '¿Cuánto cuesta?', 'KWAN-toh KWES-tah'),
('Questions', 'Where is?', '¿Dónde está?', 'DOHN-day es-TAH'),
('Questions', 'Do you speak English?', '¿Habla inglés?', 'AH-blah een-GLES'),
('Emergency', 'Help!', '¡Ayuda!', 'ah-YOO-dah'),
('Emergency', 'I need a doctor', 'Necesito un médico', 'neh-seh-SEE-toh oon MEH-dee-koh')
ON CONFLICT DO NOTHING;
