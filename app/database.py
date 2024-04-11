class fire_database:
    def __init__(self, db):
        self.db = db

    def data_to_collection(self, data, user):
        print(f"------------firebase---{data}-------")
        try:
            dbUser = self.db.collection('users').document(user).set(data)
            return dbUser
        except Exception as e:
            print(e)