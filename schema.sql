CREATE TABLE "Brands" (
    	"Brand" VARCHAR NOT NULL,
    	"Country" VARCHAR,
	"Whiskies" VARCHAR,
	"Votes" VARCHAR,
	"Rating" VARCHAR,
	"WB_Ranking" VARCHAR NOT NULL
);

CREATE TABLE "Distillery" (
    	"Company" VARCHAR NOT NULL,
    	"Country" VARCHAR,
	"Founded" VARCHAR,
	"Closed" VARCHAR,
	"Views" VARCHAR NOT NULL,
	"Ranking" VARCHAR NOT NULL,
	"Votes" VARCHAR,
	"Wishlist" VARCHAR,
    	"Rating" NUMERIC(5,2),
	"Whisky" VARCHAR,
	"Collection" VARCHAR,
    	"Lat" INT NOT NULL,
    	"Lon" INT NOT NULL
);

