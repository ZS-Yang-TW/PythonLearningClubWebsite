from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.crud import authenticate_user, get_current_active_user, activate_user, create_access_token
from app.crud import ACCESS_TOKEN_EXPIRE_MINUTES
from app.api.deps import SessionDep
from app.models import User, Token

router = APIRouter()

@router.post("/login/access-token")
def login(session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    """
    **【登入驗證】**
    
    1. 驗證使用者帳號密碼。
    2. 將使用者的登入狀態(is_active)設為 True。
    3. 生成 jwt token，並回傳。
    """
    
    user = authenticate_user(session=session, username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="帳號或密碼錯誤")
    
    activate_user(session=session, user=user)
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.username}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")

@router.get("/me")
def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    """
    **【取得當前使用者】**
    """
    return current_user