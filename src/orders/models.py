from sqlalchemy import ForeignKey, Date, Column, Integer, String, Table, Float

from src.database import metadata

order = Table(
    "order",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("date", Date, nullable=False),
    Column("type", String),
    Column("amount", Float, nullable=False),
    Column("currency", String, nullable=False),
    Column("user_id", Integer, ForeignKey("user.id", ondelete="CASCADE"))
)
