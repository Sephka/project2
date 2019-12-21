#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd 
from sqlalchemy import create_engine


# In[2]:


csv_file = "../ETL-Project/Distillery.csv"
distillery_data_df = pd.read_csv(csv_file)
distillery_data_df.head()


# In[3]:


new_distillery_data_df = distillery_data_df[['Company', 'Country', 'Rating', 'lon', 'lat']].copy()
new_distillery_data_df = new_distillery_data_df.dropna(how="any")
new_distillery_data_df.head()


# In[4]:


csv_file = "../ETL-Project/Whisky_Brand.csv"
brand_data_df = pd.read_csv(csv_file)
brand_data_df.head()


# In[5]:


new_brand_data_df = brand_data_df[['Brand', 'Country', 'Rating']].copy()
new_brand_data_df = new_brand_data_df.dropna(how="any")
new_brand_data_df.head()


# In[6]:


join_data = [new_distillery_data_df, new_brand_data_df]
result = pd.concat(join_data, sort=True)
result.head()


# In[13]:


connection_string = "postgres:postgres@localhost:5432/ETL_db"
engine = create_engine(f'postgres://{connection_string}')
print(connection_string)


# In[15]:


engine.table_names()


# In[17]:


new_brand_data_df.to_sql(name='brand', con=engine, if_exists='append', index=True)


# In[19]:


new_distillery_data_df.to_sql(name='company', con=engine, if_exists='append', index=True)

