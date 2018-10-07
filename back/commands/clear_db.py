class Clear_DB:
    def run(self):
        db.reflect()
        db.drop_all()
