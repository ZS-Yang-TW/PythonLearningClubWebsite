'''
新增資料庫、啟用 FastAPI、設定 CORS origins。
'''
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.api.main import api_router
from sqlmodel import SQLModel
from app.core.db import engine

# Create the database
SQLModel.metadata.create_all(engine)

# Create the FastAPI app
API_V1_STR = "/api/v1"
app = FastAPI(
    title="Pyton Learning Club WebSite API",
    description="Python 學習讀書會網站 API 文件",
    openapi_url=f"{API_V1_STR}/openapi.json",
)

# Set CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:3000",
    ],
    allow_credentials=True, # 允許跨域請求攜帶 cookie
    allow_methods=["*"], # 允許所有請求方法
    allow_headers=["*"], # 允許所有請求標頭
)

# Include the API routes
app.include_router(api_router, prefix=API_V1_STR)