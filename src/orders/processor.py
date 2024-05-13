from datetime import datetime
from typing import Any
from src.auth.manager import User
import pandas as pd
import tabula

codes = pd.read_csv("src/mcc.csv", sep=";").set_index("mcc").to_dict()


def parse_pdf(filename: str, file, user: User) -> list[dict[Any]]:
    df = pd.DataFrame()
    temp_df = pd.concat(tabula.read_pdf(file, lattice=True, pages="all"))

    if filename:
        temp_df = temp_df[temp_df["МСС категория"] != "―"]
        df["date"] = temp_df["Дата и\rвремя\rсовершения"].apply(lambda x: datetime.strptime(x, "%d.%m.%Y %H:%M:%S").date())
        df["type"] = temp_df["МСС категория"].astype(int).map(codes["type"])
        df[["amount", "currency"]] = temp_df["Сумма в\rвалюте\rоперации"].str.split(" ", expand=True)
        df["amount"] = df["amount"].str.replace(",", ".").astype(float)
        df["user_id"] = user.id

    return df.to_dict("records")