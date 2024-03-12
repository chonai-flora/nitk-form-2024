import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials


class FirestoreClient:
    def __init__(self):
        cred = credentials.Certificate("./credentials.json")
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def fetch_ref(self, collection):
        return self.db.collection(collection)