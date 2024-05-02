from sqlmodel import create_engine

SQLALCHEMY_DATABASE_URL = "sqlite:///./learningclub.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
