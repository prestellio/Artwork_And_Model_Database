-- Using test Data
--Preston Elliott R447V989

INSERT INTO Places (Place, Land_Type, Universe, Angle_Type, Design_Id) VALUES
('Skyland', 'Floating', 'AstroVerse', 'Tilted', 101),
('Crimson Desert', 'Arid', 'GeoVerse', 'Flat', 102),
('Mystic Forest', 'Forested', 'MystiVerse', 'Curved', 103),
('Celestial Shores', 'Coastal', 'AstroVerse', 'Sloped', 104),
('Obsidian Caves', 'Rocky', 'GeoVerse', 'Jagged', 105),
('Ethereal Meadows', 'Grasslands', 'MystiVerse', 'Wavy', 106);


INSERT INTO Designs (Design_Id, Item_Type, Texture, Colored) VALUES
(101, 'Place', 'Smooth', false),
(102, 'Place', 'Bumpy', true),
(103, 'Place', 'Smooth', true),
(104, 'Place', 'Smooth', true),
(105, 'Place', 'Bumpy', true),
(106, 'Place', 'Bumpy', false),
(201, 'Character', 'Bumpy', true),
(202, 'Character', 'Smooth', true),
(203, 'Character', 'Smooth', false),
(204, 'Character', 'Smooth', true),
(205, 'Character', 'Smooth', true),
(206, 'Character', 'Bumpy', true),
(301, 'Vehicle', 'Grooved', true),
(302, 'Vehicle', 'Smooth', false),
(303, 'Vehicle', 'Bumpy', false),
(304, 'Vehicle', 'Bumpy', true),
(305, 'Vehicle', 'Grooved', false),
(306, 'Vehicle', 'Bumpy', true);

INSERT INTO Creators (Universe, Creator_Name, Creator_Id, Release) VALUES
('AstroVerse', 'Stellar Studios', 1, '2023-02-15'),
('GeoVerse', 'Earthy Creations', 2, '2022-07-10'),
('MystiVerse', 'Enchanted Labs', 3, '2024-01-25');


INSERT INTO Characters (Character_Name, Introduced, Universe, Pose_Type, Design_Id) VALUES
('Nova Knight', '2023-03-01', 'GeoVerse', 'Heroic', 201),
('Sand Sage', '2022-08-15', 'AstroVerse', 'Meditative', 202),
('Fey Wanderer', '2024-02-01', 'MystiVerse', 'Dynamic', 203),
('Galactic Sentinel', '2023-04-10', 'AstroVerse', 'Defensive', 204),
('Terra Nomad', '2022-09-20', 'GeoVerse', 'Relaxed', 205),
('Shadow Enchanter', '2024-03-18', 'MystiVerse', 'Mysterious', 206);




INSERT INTO Vehicles (Vehicle, Traversal, Appearance, Universe, Design_Id) VALUES
('Sky Glider', 'Airborne', '2023-03-15', 'AstroVerse', 301),
('Sand Skimmer', 'Land', '2022-09-01', 'GeoVerse', 302),
('Mystic Cruiser', 'All-Terrain', '2024-02-10', 'MystiVerse', 303),
('Nebula Drifter', 'Airborne', '2023-05-01', 'AstroVerse', 304),
('Rock Rover', 'Land', '2022-10-05', 'GeoVerse', 305),
('Phantom Chariot', 'All-Terrain', '2024-04-08', 'MystiVerse', 306);




INSERT INTO Products (Combination_Id, Universe, Design_Id, Size) VALUES
(1003, 'AstroVerse', 301, '5x7'),
(1002, 'GeoVerse', 102, '6'),
(1001, 'MystiVerse', 203, '4x2.5'),
(1004, 'AstroVerse', 304, '8x10'),
(1005, 'GeoVerse', 305, '7'),
(1006, 'MystiVerse', 306, '5x3');




INSERT INTO Prices (Form, Material, Price, Size, Combination_Id) VALUES
('Figurine', 'Plastic', 499.99, 'Medium', 1002),
('Poster', 'Paper', 599.99, '5x7', 1003),
('Card', 'Cardboard', 199.99, '4x2.5', 1001),
('Figurine', 'Plastic', 999.99, 'Large', 1004),
('Poster', 'Paper', 599.99, '10x16', 1005),
('Tarot Deck', 'Cardboard', 799.99, 'Standard', 1006);









