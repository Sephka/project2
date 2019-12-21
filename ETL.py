import pandas as pd 
from sqlalchemy import create_engine


csv_file = "./data/Distillery.csv"
distillery_data_df = pd.read_csv(csv_file)
distillery_data_df.head()


new_distillery_data_df = distillery_data_df[['Company', 'Country', 'Founded', 'Closed', 'Views', 'Ranking', 'Votes', 'Wishlist', 'Rating', 'Whisky', 'Collection', 'lon', 'lat']].copy()
new_distillery_data_df = new_distillery_data_df.dropna(how="any")
new_distillery_data_df.head()


csv_file = "./data/Whisky_Brand.csv"
brand_data_df = pd.read_csv(csv_file)
brand_data_df.head()


new_brand_data_df = brand_data_df[['Brand', 'Country', 'Whiskies', 'Votes', 'Rating', 'Brand_Ranking']].copy()
new_brand_data_df = new_brand_data_df.dropna(how="any")
new_brand_data_df.head()


join_data = [new_distillery_data_df, new_brand_data_df]
result = pd.concat(join_data, sort=True)
result.head()


connection_string = "postgres:password@localhost:5432/project-2"
engine = create_engine(f'postgresql://{connection_string}')
print(connection_string)


engine.table_names()


new_brand_data_df.to_sql(name='brand', con=engine, if_exists='append', index=True)


new_distillery_data_df.to_sql(name='company', con=engine, if_exists='append', index=True)

