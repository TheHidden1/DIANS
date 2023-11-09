import json

file = open('./originalData.json', encoding="utf8")
originalJson = file.read()
data = json.loads(originalJson)
data = data["elements"]

def onlyNodes(data):
    filteredData = []
    for row in data:
        if row['type'] == 'node':
            filteredData.append(row)

    return filteredData

def onlyNeededCategories(data):
    neededCategories = [
        "artwork",
        "art_gallery",
        "attraction",
        "gallery",
        "museum",
        "viewpoint",
        "zoo",
        "yes"
    ]
    filteredData = []
    for row in data:
        if row['tags']["tourism"] and row['tags']['tourism'] in neededCategories:
            filteredData.append(row)

    return filteredData

def onlyWithName(data):
    filteredData = []
    for row in data:
        if "tags" in row and "name" in row['tags']:
            if "name:en" in row['tags']:
                row['tags']['name'] = row['tags']['name:en']
            filteredData.append(row)

    return filteredData

def removeSpecialCharacters(data):
    for row in data:
        if "tags" in row and "name" in row['tags']:
            row['tags']['name'] = ''.join(letter for letter in row['tags']['name'] if (letter.isalnum() or letter==" "))
            if "name:en" in row['tags']:
                row['tags']['name:en'] = ''.join(
                    letter for letter in row['tags']['name:en'] if (letter.isalnum() or letter == " "))

    return data

def onlyNeededData(data):
    neededData = []
    for row in data:
        neededData.append({
            "id": row['id'],
            "lat": row['lat'],
            "lon": row['lon'],
            "name": row['tags']['name'],
            "tourism": row['tags']['tourism']
        })
    return neededData

def exportNodes(data):
    i = 1
    for node in data:
        f = open("./places/"+str(i)+".json", "w", encoding="utf8")
        f.write(str(node).replace("'", "\""))
        f.close()
        i = i+1

exportNodes(onlyNeededData(onlyNeededCategories(removeSpecialCharacters(onlyWithName(onlyNodes(data))))))