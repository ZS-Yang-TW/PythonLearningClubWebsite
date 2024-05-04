'''
crud.py 是用來定義資料庫 CRUD (Create, Read, Update, Delete) 操作的函式。
'''
from typing import Annotated, Union
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.models import User, UserCreate, TokenData
from app.api.deps import SessionDep
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login/access-token")

# Hash settings
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "37ef63b27b3ceb9e3056db25c2543afe0e5594c8dffe3723f13e6290f6826138"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str):
    """
    【加密】
    
    將密碼透過 passlib 的 hash 函式，進行 hash 加密。
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    """
    【密碼驗證】
    
    透過 passlib 的 verify 函式，驗證密碼是否正確。
    """
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    """
    【創建 jwt access token】
    
    1. 複製一份傳入的 data
    2. 設定 token 的過期時間，加入 data。
    3. 透過 jwt.encode 函式，生成 jwt token。
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

def authenticate_user(*, session: Session, username: str, password: str) -> User | None:
    """
    【使用者驗證】
    
    根據 username 取得使用者資料，並驗證密碼是否正確。
    """
    user = get_user_by_username(session=session, username=username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def create_user(*, session: Session, user_create: UserCreate) -> User:
    user_dict = user_create.model_dump()
    user = User(**user_dict, hashed_password=hash_password(user_create.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_user_by_id(*, session: Session, user_id: int) -> User | None:
    statement = select(User).where(User.id == user_id)
    session_user = session.exec(statement).first()
    return session_user

def get_user_by_username(*, session: Session, username: str) -> User | None:
    statement = select(User).where(User.username == username)
    session_user = session.exec(statement).first()
    return session_user

def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user

def activate_user(*, session: Session, user: User) -> User:
    db_user = session.get(User, user.id)
    db_user.is_active = True
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return user

def get_user_by_jwt(*, session: SessionDep, token: Annotated[str, Depends(oauth2_scheme)]):
    """
    【以 jwt 取得使用者】
    
    1. 將 jwt token 解碼，以便從 jwt 取得 username。
    2. 根據 username 取得使用者資料。若使用者不存在，回傳 401 (Unauthorized)。
    3. 若使用者存在，回傳使用者資料。
    
    """
    
    # 定義一個 credentials_exception，當驗證失敗時，回傳此例外。
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username_in_paylod: str = payload.get("username")
        if username_in_paylod is None:
            raise credentials_exception
        token_data = TokenData(username=username_in_paylod)
        
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_username(session=session, username=token_data.username)
    
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: Annotated[User, Depends(get_user_by_jwt)]):
    """
    【取得當前使用者】
    """
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="使用者尚未登入")
    return current_user