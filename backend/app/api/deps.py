'''
定義一個 get_db 函數，用來獲取資料庫連線
並定義一個 SessionDep 類型。
'''

from collections.abc import Generator
from typing import Annotated

from fastapi import Depends
from sqlmodel import Session
from app.core.db import engine

def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_db)]