'''
models.py
用來定義實體的資料模型。
'''

from sqlmodel import Field, SQLModel

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None

class UserCreate(UserBase):
    password: str
    
class User(UserCreate, table=True):
    id: int = Field(default=None, primary_key=True)