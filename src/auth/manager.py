from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import Depends, Request, BackgroundTasks
from fastapi_users import BaseUserManager, IntegerIDMixin, exceptions, models, schemas
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase

from src.auth.models import User

from src.database import get_async_session

from src.config import SECRET_AUTH


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = SECRET_AUTH

    async def update(
        self,
        user_update: User,
            user: User,
        safe: bool = False,
        request: Optional[Request] = None
    ) -> models.UP:
        password = user_update.create_update_dict().pop('password')
        updated_user = await self.user_db.update(user, {"hashed_password": self.password_helper.hash(password)})

        return updated_user
    
    async def create(
        self,
        user_create: schemas.UC,
        safe: bool = False,
        request: Optional[Request] = None,
    ) -> models.UP:
        existing_user = await self.user_db.get_by_email(user_create.email)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = user_create.create_update_dict()        
        password = user_dict.pop("password")
        user_dict["hashed_password"] = self.password_helper.hash(password)
        created_user = await self.user_db.create(user_dict)

        return created_user


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
