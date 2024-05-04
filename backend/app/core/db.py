'''
建立資料庫連線的模組
'''
from sqlmodel import create_engine

SQLALCHEMY_DATABASE_URL = "sqlite:///./learningclub.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
