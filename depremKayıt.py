import pyodbc
import os
import pandas as pd 



df = pd.read_csv("temizlenmis_veri.csv")

def connect():
    try:
        connection = pyodbc.connect(
            f'DRIVER={{ODBC Driver 17 for SQL Server}};'
            f'SERVER=127.0.0.1;'
            f'DATABASE=Fayturk;'
            f'UID=SA;'
            f'PWD=YourStrong#Password'
        )
        return connection

    except Exception as e:
        print("Bağlantı hatası:", e)

connected = connect()
cursor = connected.cursor()



for x,y in df.iterrows():
    try:
        query = f""" 
        INSERT INTO [dbo].[earthquake]
            ([Date]
            ,[Longitude]
            ,[Latitude]
            ,[Depth]
            ,[Rms]
            ,[Type]
            ,[Magnitude]
            ,[Location]
            ,[EventID])
        VALUES
            ('{y['Date']}'
            ,{y['Longitude']}
            ,{y['Latitude']}
            ,{y['Depth']}
            ,{y['Rms']}
            ,'{y['Type']}'
            ,{y['Magnitude']}
            ,'{y['Location']}'
            ,'{y['EventID']}')
        
        """
        cursor.execute(query)
        cursor.commit()
    except Exception as e:
        print("hata",e)
    

connected.close()