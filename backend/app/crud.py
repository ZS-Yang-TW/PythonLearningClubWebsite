'''
crud.py 是用來定義資料庫 CRUD (Create, Read, Update, Delete) 操作的函式。
'''

from sqlmodel import Session
from app.models import User, UserCreate

def create_user(*, session: Session, user_create: UserCreate) -> User:
    user = User(**user_create.model_dump())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
