from fastapi import APIRouter, HTTPException
from app import crud
from app.api.deps import SessionDep
from app.models import UserCreate

router = APIRouter()

@router.post("/", response_model=UserCreate)
def create_user(session: SessionDep, user_in: UserCreate):
    """
    Create new user.
    """
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    user = crud.create_user(session=session, user_create=user_in)
    return user