from firestore_client import FirestoreClient


course_ids = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
]
schedules = [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
]


def init_applicants(firestore_client):
    ref = firestore_client.fetch_ref("applicants")
    applicants = dict.fromkeys(schedules, [])

    for course_id in course_ids:  
        docs = ref.document(course_id)
        docs.set(applicants)


def init_capacities(firestore_client):
    ref = firestore_client.fetch_ref("capacities")
    capacities = dict.fromkeys(schedules, 4)

    for course_id in course_ids:  
        docs = ref.document(course_id)
        docs.set(capacities)


def main():
    firestore_client = FirestoreClient()
    init_applicants(firestore_client)
    init_capacities(firestore_client)


if __name__ == "__main__":
    main()