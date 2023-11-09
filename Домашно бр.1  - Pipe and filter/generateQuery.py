import os
import json

# Directory containing JSON files
json_dir = 'places'

# Output SQL file for all the INSERT statements
sql_output_file = 'init_table.sql'

# Database table and fields (adjust these according to your database schema)
table_name = 'places'
fields_to_insert = ['osm_id', 'lat', 'lng', 'name', 'tourism']  # Replace with your field names

# Create and open the SQL file in write mode
with open(sql_output_file, 'w', encoding="utf8") as sql_file:
    sql_file.write("CREATE TABLE places (id SERIAL PRIMARY KEY, osm_id TEXT, lat REAL, lng REAL, name TEXT, tourism TEXT);\n")
    sql_file.write(f"INSERT INTO {table_name} ({', '.join(fields_to_insert)})\nVALUES\n")
    counter = 1
    for filename in os.listdir(json_dir):
        if filename.endswith('.json'):
            with open(os.path.join(json_dir, filename), 'r', encoding="utf8") as file:
                jsonString = file.read()
                data = json.loads(jsonString)

            # Construct the SQL query for insertion
            sql_query = f"('{data['id']}',{float(data['lat'])}, {float(data['lon'])}, '{data['name']}', '{data['tourism']}')"
            if counter == len(os.listdir(json_dir)):
                sql_query+=';'
            else:
                sql_query+=',\n'
            counter+=1
            # Write the SQL query to the output file
            sql_file.write(sql_query)
