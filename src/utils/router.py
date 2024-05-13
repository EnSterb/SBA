from fastapi import APIRouter, BackgroundTasks, Depends

from src.auth.base_config import current_user
from src.auth.models import User

# from src.utils.tasks import send_email

router = APIRouter(
    prefix="/utils",
    tags=["Util"]
)



'''
@router.get("/send")
def send_email(background_tasks: BackgroundTasks, user: User = Depends(current_user)):
    background_tasks.add_task(send_email, user.email)
    return {
        "status": 200,
        "data": None,
        "details": None
    }
'''