from fastapi import APIRouter
from app import crud
from app.api.deps import SessionDep
from app.models import User, UserCreate

router = APIRouter()

# @router.post("/")
# def create_user():
#     return {"message": "User created"}

@router.post("/", response_model=UserCreate)
def create_user(session: SessionDep, user_in: UserCreate):
    """
    Create new user.
    """
    # user = crud.get_user_by_email(session=session, emXail=user_in.email)
    # if user:
    #     raise HTTPException(
    #         status_code=400,
    #         detail="The user with this email already exists in the system.",
    #     )

    user = crud.create_user(session=session, user_create=user_in)
    return user