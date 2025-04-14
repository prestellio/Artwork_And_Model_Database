-- Create, Read, Update, DELETE
--Preston Elliott R447V989


-- Create
INSERT INTO Prices (Form, Material, Price, Size, Combination_Id) VALUES
('Poster', 'Metal', 749.99, '5x7', 1007);

SELECT * FROM Prices WHERE Price > 500.00; -- Read

UPDATE Prices --Update
SET Price = 0
WHERE Material = 'Paper' AND size = '5x7';

DELETE FROM Prices WHERE Form = 'Poster'; -- Delete




