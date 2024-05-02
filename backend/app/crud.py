from sqlmodel import Session
from app.models import User, UserCreate

def create_user(*, session: Session, user_create: UserCreate) -> User:
    user = User(**user_create.model_dump())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
