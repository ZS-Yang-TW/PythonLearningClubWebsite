from fastapi import APIRouter, HTTPException, Depends
from app import crud
from app.api.deps import SessionDep
from app.models import User, UserCreate

router = APIRouter()

@router.post("/", response_model=User)
def create_user(session: SessionDep, user_input: UserCreate) -> User:
    """
    **【創建使用者】**
    
    1. 檢查 email 是否已被註冊。
    2. 若 email 未被註冊，創建使用者，並回傳使用者資料。
    """
    user = crud.get_user_by_email(session=session, email=user_input.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="此 email 已被註冊",
        )

    user = crud.create_user(session=session, user_create=user_input)
    return user

@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, session: SessionDep) -> User:
    """
    **【根據 user_id 取得使用者】**
    
    1. 根據 user_id 取得使用者資料，若使用者不存在，回傳 404。
    """
    user = crud.get_user_by_id(session=session, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="該用戶不存在")
    return user