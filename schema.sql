DROP TABLE brand;
DROP TABLE company;

CREATE TABLE "brand" (
	"index" INT NOT NULL,
    	"Brand" VARCHAR NOT NULL,
    	"Country" VARCHAR,
	"Whiskies" INT,
	"Votes" INT,
	"Rating" NUMERIC(5,2),
	"Brand_Ranking" VARCHAR NOT NULL
);

CREATE TABLE "company" (
	"index" INT NOT NULL,
    	"Company" VARCHAR NOT NULL,
    	"Country" VARCHAR,
    	"Rating" NUMERIC(5,2),
	"Whisky" INT,
	"Collection" INT,
    	lon INT NOT NULL,
    	lat INT NOT NULL
);

SELECT * FROM "brand";
SELECT * FROM "company";