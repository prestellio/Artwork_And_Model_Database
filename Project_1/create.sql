--Tables for Sci-Fi and Fantasy Artwork and Model Shop
--Preston Elliott R447V989

/*
Design_Id -> Place
Place -> Land_Type
Place -> Universe
*/
CREATE TABLE Places (
    Place TEXT PRIMARY KEY,
    Land_Type TEXT NOT NULL,
    Universe TEXT NOT NULL,
    Angle_Type TEXT NOT NULL,
    Design_Id INTEGER NOT NULL,
    FOREIGN KEY (Universe) REFERENCES Creators(Universe),
    FOREIGN KEY (Design_Id) REFERENCES Designs(Design_Id)
);

/*
Design_Id -> Item_Type
Design_Id -> Texture
Design_Id -> Colored
*/

CREATE TABLE Designs (
    Design_Id INTEGER PRIMARY KEY,
    Item_Type TEXT NOT NULL,
    Texture TEXT,
    Colored BOOLEAN NOT NULL
);

/*
Universe -> Creator_name
Universe -> Release
Creator_Id -> Creator_name
*/
CREATE TABLE Creators (
     Universe TEXT NOT NULL,
     Creator_name TEXT PRIMARY KEY,
     Creator_Id INTEGER NOT NULL,
     Release DATE
);


/*
Character_Name, Universe -> Introduced
Design_Id -> Character_Name
Design_Id -> Pose_Type
Design_Id -> Universe
Design_Id -> Introduced
*/
CREATE TABLE Characters (
    Character_Name TEXT NOT NULL,
    Introduced DATE,
    Universe TEXT NOT NULL,
    Pose_Type TEXT NOT NULL,
    Design_Id INTEGER NOT NULL,
    FOREIGN KEY (Universe) REFERENCES Creators(Universe),
    FOREIGN KEY (Design_Id) REFERENCES Designs(Design_Id)
);

/*
Combination_Id -> Universe
Combination_Id, Universe -> Design_Id
Combination_Id -> Size
*/
CREATE TABLE Products (
    Combination_Id INTEGER NOT NULL,
    Universe TEXT NOT NULL,
    Design_Id INTEGER NOT NULL,
    Size TEXT NOT NULL,
    FOREIGN KEY (Universe) REFERENCES Creators(Universe),
    FOREIGN KEY (Size, Combination_Id) REFERENCES Prices(Size, Combination_Id),
    FOREIGN KEY (Design_Id) REFERENCES Designs(Design_Id)
);

/*
Design_Id -> Vehicle
Design_Id -> Universe
*/
CREATE TABLE Vehicles (
    Vehicle TEXT PRIMARY KEY,
    Traversal TEXT NOT NULL,
    Appearance DATE,
    Universe TEXT NOT NULL,
    Design_Id INTEGER NOT NULL,
    FOREIGN KEY (Universe) REFERENCES Creators(Universe), 
    FOREIGN KEY (Design_Id) REFERENCES Designs(Design_Id)
);

/*
Combination_Id -> Form
Combination_Id -> Material
Combination_Id -> Size
*/

CREATE TABLE Prices (
    Form TEXT NOT NULL,
    Material TEXT NOT NULL,
    Price FLOAT NOT NULL,
    Size TEXT,
    Combination_Id INTEGER PRIMARY KEY
);

