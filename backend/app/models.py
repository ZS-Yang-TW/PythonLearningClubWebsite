'''
models.py
用來定義實體的資料模型。
'''

from sqlmodel import Field, SQLModel

class UserBase(SQLModel):
    username: str
    email: str = Field(unique=True, index=True)
    full_name: str | None = None
    is_active: bool = False

class UserCreate(UserBase):
    password: str
    
class User(UserBase, table=True):
    id: int = Field(default=None, primary_key=True)
    hashed_password: str
    
class Token(SQLModel):
    access_token: str
    token_type: str

class TokenData(SQLModel):
    username: str | None = None