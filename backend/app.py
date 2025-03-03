from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Tworzymy bazę
DATABASE_URL = "sqlite:///test.db"

# Deklaracja bazy
Base = declarative_base()

# Tworzymy model (tabelę)
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)

# Utworzenie silnika bazy danych
engine = create_engine(DATABASE_URL)

# Tworzymy tabele
Base.metadata.create_all(engine)

# Tworzymy sesję
Session = sessionmaker(bind=engine)
session = Session()

# Dodanie przykładowych danych
new_user = User(name="Seburek", age=25)
session.add(new_user)
session.commit()

# Zbieranie danych z bazy
users = session.query(User).all()
for user in users:
    print(f"ID: {user.id}, Name: {user.name}, Age: {user.age}")

# Zamykamy sesję
session.close()
