from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates

from src.orders.router import get_orders

router = APIRouter(prefix="", tags=["Pages"])
templates = Jinja2Templates(directory="src/templates")


@router.get("/login")
def get_login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


@router.get("/index")
def get_login_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@router.get("/register")
def get_login_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


@router.get("/work")
def get_login_page(request: Request, operations=Depends(get_orders)):
    return templates.TemplateResponse("work.html", {"request": request})



@router.get("/change-password")
def get_login_page(request: Request):
    return templates.TemplateResponse("change-password.html", {"request": request})
