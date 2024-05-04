'''
crud.py 是用來定義資料庫 CRUD (Create, Read, Update, Delete) 操作的函式。
'''

from sqlmodel import Session, select
from app.models import User, UserCreate

def create_user(*, session: Session, user_create: UserCreate) -> User:
    user = User(**user_create.model_dump())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user
