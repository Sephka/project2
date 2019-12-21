-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Brands" (
    "BrandName" VARCHAR   NOT NULL,
    "Country" VARCHAR   NOT NULL,
    "Rating" INT   NOT NULL
);

CREATE TABLE "Distillery" (
    "Company" VARCAHR   NOT NULL,
    "Country" VARCHAR   NOT NULL,
    "Rating" INT   NOT NULL,
    "Lat" INT   NOT NULL,
    "Lon" INT   NOT NULL
);

