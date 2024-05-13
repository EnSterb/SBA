from datetime import datetime

from pydantic import BaseModel


class OrderCreate(BaseModel):
    id: int
    date: datetime
    type: str
    amount: float
    currency: str
    user_id: int
